/**
 * Database.ts
 *
 * This file defines the interface for a database interaction object.
 */

import { userID, Location } from '../utils/types';
import FireStoreDB from './FireStore';
import {LocationInfo, UserInfo} from '@/../../common/types/types';

export interface Database {
    /**
     * Adds a user to the database
     * @param name 
     * @returns the id of the user
     * @throws Error if the user cannot be added
     */
    addUser(name: string): Promise<userID>;
    
    /**
     * Returns a list of all friends for a user
     * 
     * @param id 
     */
    getFriends(id: userID): Promise<Array<userID>>;

    /**
     * Returns basic information about a user
     * 
     * @param id
     */
    getUserInfo(id: userID): Promise<UserInfo>;
    
    /**
     * Make two users friends
     * 
     * @param id1 
     * @param id2 
     * @throws ReferenceError if either id0 or id1 is not found
     */
    makeFriends(id1: userID, id2: userID): Promise<void>;

    /**
     * Add a location to the database
     * 
     * @param id 
     * @param locationInfo
     * @throws ReferenceError if the user is not found
     * @throws Error if the location cannot be added
     */
    addLocation(id: userID, locationInfo: LocationInfo): Promise<void>;

    /**
     * Returns the most recent location for a user
     * 
     * @param id 
     * @throws ReferenceError if the user is not found
     * @throws Error if there are no locations for the user
     * @throws Error if the location cannot be found
     */
    getCurrentLocation(id: userID): Promise<LocationInfo>;

    /**
     * Returns the most recent location for all of a user's friends
     * 
     * @param id
     */
    getFriendsCurrentLocation(id: userID): Promise<Array<LocationInfo>>;
    
    /**
     * Prints the current state
     */
    dump(): void;
}

function getDatabase(): Database {
    return new FireStoreDB();
}

const database = getDatabase();
export default database;
