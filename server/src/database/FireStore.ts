// const Firestore = require('@google-cloud/firestore');
// import * as geofire from 'geofire');
// import { Location } from '../types/types';

// const db = new Firestore({
//   projectId: process.env.GOOGLE_PROJECT_ID,
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });

// public toTimestamp = (date: Date) => {
//   return Firestore.Timestamp.fromDate(date);
// }

// public toLocation = (location: Location) => {
//   return Geofire.geohashForL
// }

// export default db;

// const Firestore = require('@google-cloud/firestore');
import FirebaseFirestore from '@google-cloud/firestore';
import { Database } from './Database';
import { userID, Location } from '../utils/types';
import { gen_id } from '../utils/utils';

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

  /**
   * @inheritdoc
   */
  public add_user = async (name: userID) => {
      let id: userID = gen_id();

      console.log(`Adding user with id: ${id} and name ${name}`);
      await this.users.doc(id).set({
          "name": name,
          "id": id,
      })
      await this.friends.doc(id).set({
          "friends": [id,]
      })
      return id;
  };
      
  /**
   * @inheritdoc
   */
  public get_friends = async (id: userID) => {
      const doc = await this.friends.doc(id).get();
      if (!doc.exists) {
          console.log("No such id!\n");
      } else {
          return doc.data()?.["friends"];
      }
  };

  /**
   * 
   * @param id0 
   * @param id1 
   * @returns A promise that resolves when the operation is complete
   * @throws Error if either id0 or id1 is not found, in a rejected promise
   */
  public async make_friends (id1: userID, id2: userID): Promise<void> {
      const doc1 = await this.friends.doc(id1).get();
      const doc2 = await this.friends.doc(id2).get();
      if (!doc1.exists  || !doc2.exists) {
        throw new Error("No such id!\n");
      } else {
          let user1_friends = doc1.data()?.["friends"];
          let user2_friends = doc2.data()?.["friends"];

          if (!user1_friends.includes(id2)) user1_friends.push(id2);
          if (!user2_friends.includes(id1)) user2_friends.push(id1);

          await this.friends.doc(id1).set({ "friends": user1_friends });
          await this.friends.doc(id2).set({ "friends": user2_friends });
      }
  }

  /**
   * @inheritdoc
   */
  public async add_location (id: userID, timestamp: number, location: Location): Promise<void> {
      await this.locations.add({
          id: id,
          time: timestamp,
          latitude: location.latitude,
          longitude: location.longitude
      });
  }

  /**
   * @inheritdoc
   */
    public async get_current_location (id: userID): Promise<[number, Location]> {
      const snapshot = await this.locations
        .where('id', '==', id)
        .orderBy('time', 'desc')
        .limit(0).get(); 
      
      const entry = snapshot.docs[snapshot.docs.length - 1].data()
      // const date: Date = fromTimestamp(entry["time"]);
      const location: Location = {longitude: entry["longitude"], latitude: entry["latitude"]};
      return [entry["time"], location];
    };

  /**
   * @inheritdoc
   */
  public async get_friends_current_location (userId: userID): Promise<Array<Location>> {
      const friendsIds = await this.get_friends(userId);
      if (!friendsIds) {
          console.log("No friends found for the given user.");
          return [];
      }

      const friendsLocations = await Promise.all(
          friendsIds.map(async (friendId: string) => {
              const data = await this.get_current_location(friendId);
              return {
                  "friend": friendId,
                  "timestamp": data[1],
                  "location": data[0]
              };
          })
      );

      return friendsLocations;
  };

  /**
   * @inheritdoc
   */
  public dump(): void {
      console.log(`USERS: ${JSON.stringify(this.users)}`);
      console.log(`FRIENDS: ${JSON.stringify(this.friends)}`);
      console.log(`LOCS: ${JSON.stringify(this.locations)}`)
  }
}


export const toTimestamp = (date: Date) => {
  return FirebaseFirestore.Timestamp.fromDate(date);
}

export const fromTimestamp = (time: FirebaseFirestore.Timestamp) => {
  return time.toDate();
}

export default FireStoreDB;