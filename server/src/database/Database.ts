/**
 * Database.ts
 *
 * This file defines the interface for a database interaction object.
 */

import { userID, Location } from '../types/types';
import { HackyDatabase } from './hackyDatabase';

export interface Database {
    /**
     * 
     * @param name 
     */
    add_user(name: userID): string;
    
    /**
     * Get a list of friends for a given user
     * 
     * @param id 
     */
    get_friends(id: userID): string[];
    
    /**
     * 
     * @param id1 
     * @param id2 
     */
    make_friends(id1: userID, id2: string): void;

    /**
     * 
     * @param id 
     * @param timestamp 
     * @param location 
     */
    add_location(id: userID, timestamp: number, location: Location): void;

    /**
     * 
     * @param id 
     */
    get_current_location(id: userID): [number, Location];

    /**
     * 
     * @param uuid 
     */
    get_friends_current_location(id: userID): Array<Location>;
    
    /**
     * Prints the current state
     */
    dump(): void;
}

function getDatabase(): Database {
    return new HackyDatabase();
}

const database = getDatabase();
export default database;
