import crypto from 'crypto'
import { userID, Location } from '../types/types';
import db from '../database/FireStore'

const usersCollection = db.collection('users');
const friendsCollection = db.collection('friends');

const gen_id = () => {
    return `user-${crypto.randomBytes(4).toString('hex')}`;
}

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
    if (!doc1.exists || !doc2.exists) {
        console.log("ids invalid");
    } else {
        let user1_friends = doc1.data()["friends"];
        let user2_friends = doc2.data()["friends"];

        if (!user1_friends.includes(id2)) user1_friends.push(id2);
        if (!user2_friends.includes(id1)) user2_friends.push(id1);
        
        await friendsCollection.doc(id1).set({ "friends": user1_friends });
        await friendsCollection.doc(id2).set({ "friends": user2_friends });
    }
}

// /**
//  * 
//  * @param id 
//  * @param timestamp 
//  * @param location 
//  */
// add_location(id: userID, timestamp: number, location: Location): void;

// /**
//  * 
//  * @param id 
//  */
// get_current_location(id: userID): [number, Location];

// /**
//  * 
//  * @param uuid 
//  */
// get_friends_current_location(id: userID): Array<Location>;

// /**
//  * Prints the current state
//  */
// dump(): void;