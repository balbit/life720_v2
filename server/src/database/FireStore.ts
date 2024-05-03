import FirebaseFirestore from '@google-cloud/firestore';
import { Database } from './Database';
import { userID, Location } from '../utils/types';
import { gen_id } from '../utils/utils';
import {UserInfo, LocationInfo} from '@/../../common/types/types';

export class FireStoreDB implements Database {
    private readonly db: FirebaseFirestore.Firestore;
    private readonly users: FirebaseFirestore.CollectionReference;
    private readonly friends: FirebaseFirestore.CollectionReference;
    private readonly locations: FirebaseFirestore.CollectionReference;

    public constructor() {
        this.db = new FirebaseFirestore.Firestore({
            projectId: process.env.GOOGLE_PROJECT_ID,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
        this.users = this.db.collection('users');
        this.friends = this.db.collection('friends');
        this.locations = this.db.collection('locations');
    }

    private async userExists(id: userID): Promise<boolean> {
        const userDoc = await this.users.doc(id).get();
        return userDoc.exists;
    }

    private async createFriendDoc(id: userID): Promise<void> {
        await this.friends.doc(id).set({ friends: [id] });
    }

    public async addUser(name: string): Promise<userID> {
        const userID = gen_id();
        const userRef = await this.users.doc(userID).set({ id: userID, name: name });
        return userID;
    }

    public async getFriends(id: userID): Promise<Array<userID>> {
        const friendDoc = await this.friends.doc(id).get();
        if (!friendDoc.exists) {
            throw new ReferenceError(`user with id ${id} not found`);
        }
        const friendData = friendDoc.data();
        return friendData?.friends || [];
    }

    public async getUserInfo(id: userID): Promise<UserInfo> {
        const userDoc = await this.users.doc(id).get();
        if (!userDoc.exists) {
            throw new ReferenceError(`User with id ${id} not found`);
        }
        const userData = userDoc.data();
        return { id: id, name: userData?.name };
    }

    public async makeFriends(id1: userID, id2: userID): Promise<void> {
        if (!await this.userExists(id1)) {
            throw new ReferenceError(`User with id ${id1} not found`);
        }
        if (!await this.userExists(id2)) {
            throw new ReferenceError(`User with id ${id2} not found`);
        }
        let friendsDoc1 = await this.friends.doc(id1).get();
        let friendsDoc2 = await this.friends.doc(id2).get();
        if (!friendsDoc1.exists) {
            await this.createFriendDoc(id1);
            friendsDoc1 = await this.friends.doc(id1).get();
        }
        if (!friendsDoc2.exists) {
            await this.createFriendDoc(id2);
            friendsDoc2 = await this.friends.doc(id2).get();
        }
        if (!friendsDoc1.exists || !friendsDoc2.exists) {
            throw new Error(`Could not create friend document for users with ids ${id1} and ${id2}`);
        }
        await this.friends.doc(id1).update({
            friends: FirebaseFirestore.FieldValue.arrayUnion(id2),
        });
        await this.friends.doc(id2).update({
            friends: FirebaseFirestore.FieldValue.arrayUnion(id1),
        });
    }

    public async addLocation(id: userID, locationInfo: LocationInfo): Promise<void> {
        if (!await this.userExists(id)) {
            throw new ReferenceError(`User with id ${id} not found`);
        }
        await this.locations.add({
            location: new FirebaseFirestore.GeoPoint(locationInfo.location.latitude, locationInfo.location.longitude),
            timestamp: locationInfo.timestamp,
            userID: id,
        });
    }

    public async getCurrentLocation(id: userID): Promise<LocationInfo> {
        const userDoc = await this.users.doc(id).get();
        if (!userDoc.exists) {
            throw new ReferenceError(`User with id ${id} not found`);
        }
        const locationSnapshot = await this.locations
            .where('userID', '==', id)
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();
        if (locationSnapshot.empty) {
            throw new Error(`No locations found for user with id ${id}`);
        }
        const locationData = locationSnapshot.docs[0].data();
        return {
            location: {
                latitude: locationData.location.latitude, 
                longitude: locationData.location.longitude,
            },
            timestamp: locationData.timestamp,
        };
    }

    public async getFriendsCurrentLocation(id: userID): Promise<Array<LocationInfo>> {
        const friends = await this.getFriends(id);
        const friendLocations: Array<LocationInfo> = [];
        for (const friendId of friends) {
            try {
                const location = await this.getCurrentLocation(friendId);
                friendLocations.push(location);
            } catch (error) {
                console.error(`Error getting location for friend with id ${friendId}:`, error);
            }
        }
        return friendLocations;
    }

    public dump(): void {
        console.log('Dumping Firestore database');
    }
}


export function dateToTimestamp (date: Date): number {
    return date.getTime();
}

export const fromTimestamp = (time: number) => {
  return new Date(time);
}

export default FireStoreDB;