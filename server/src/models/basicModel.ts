import db, {toTimestamp} from '../database/FireStore'
import { userID, Location } from '../utils/types';
import { gen_id } from '../utils/utils';

const usersCollection = db.collection('users');
const friendsCollection = db.collection('friends');
const locationsCollection = db.collection('locations');

/**
 * 
 * @param name 
 */

export const add_user = async (name: userID) => {
    let id: userID = gen_id();
    await usersCollection.doc(id).set({
        "name": name,
        "id": id,
    })
    await friendsCollection.doc(id).set({
        "friends": [id,]
    })
    return id;
};
    
/**
 * Get a list of friends for a given user
 * 
 * @param id 
 */
export const get_friends = async (id: userID) => {
    const doc = await friendsCollection.doc(id).get();
    if (!doc.exists) {
        console.log("No such id!\n");
    } else {
        return doc.data();
    }
};

/**
 * 
 * @param id1 
 * @param id2 
 */
export const make_friends = async (id1: userID, id2: string): Promise<void> => {
    const doc1 = await friendsCollection.doc(id1).get();
    const doc2 = await friendsCollection.doc(id2).get();
    if (!doc1  || !doc2.exists) {
        console.log("ids invalid");
    } else {
        let user1_friends = doc1.data()?.["friends"];
        let user2_friends = doc2.data()?.["friends"];

        if (!user1_friends.includes(id2)) user1_friends.push(id2);
        if (!user2_friends.includes(id1)) user2_friends.push(id1);

        await friendsCollection.doc(id1).set({ "friends": user1_friends });
        await friendsCollection.doc(id2).set({ "friends": user2_friends });
    }
}

/**
 * 
 * @param id 
 * @param timestamp 
 * @param location 
 */
export const add_location = async (id: userID, timestamp: Date, location: Location): Promise<void> => {
    await locationsCollection.add({
        id: id,
        time: toTimestamp(timestamp),
        latitude: location.latitude,
        longitude: location.longitude
    });
}

/**
 * 
 * @param id 
 */
export const get_current_location = async (id: userID): Promise<[Date, Location]> => {
    console.log('got here! 1\n')
    const snapshot = await locationsCollection.where('id', '==', id).orderBy('time').limit(1).get(); 
    console.log('got here! 2\n')
    console.log(snapshot)
    console.log('got here! 3\n')
    return [new Date(), {longitude: 0, latitude: 1}]
};

// /**
//  * 
//  * @param uuid 
//  */
// get_friends_current_location(id: userID): Array<Location>;

// /**
//  * Prints the current state
//  */
// dump(): void;