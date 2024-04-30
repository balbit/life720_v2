/**
 * Database.ts
 *
 * This file defines the interface for a database interaction object.
 */

import { userID, Location } from '../utils/types';
import HackyDatabase from './hackyDatabase';
import FireStoreDB from './FireStore';

export interface Database {
    /**
     * 
     * @param name 
     */
    add_user(name: userID): Promise<string>;
    
    /**
     * Get a list of friends for a given user
     * 
     * @param id 
     */
    get_friends(id: userID): Promise<string[]>;
    
    /**
     * 
     * @param id1 
     * @param id2 
     */
    make_friends(id1: userID, id2: string): Promise<void>;

    /**
     * 
     * @param id 
     * @param timestamp 
     * @param location 
     */
    add_location(id: userID, timestamp: number, location: Location): Promise<void>;

    /**
     * 
     * @param id 
     */
    get_current_location(id: userID): Promise<[number, Location]>;

    /**
     * 
     * @param uuid 
     */
    get_friends_current_location(id: userID): Promise<Array<Location>>;
    
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
