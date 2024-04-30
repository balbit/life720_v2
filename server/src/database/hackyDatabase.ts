import crypto from 'crypto'
import { userID, Location } from '../types/types';
import { Database } from './Database';

class HackyDatabase implements Database{
    users: { [key: userID]: string } = {};
    friends: { [key: userID]: Array<userID>} = {};
    locations: { [key: userID]: Array<[number, Location]> } = {};

    constructor () {}

    gen_id = () => {
        return crypto.randomBytes(4).toString('hex');
    }

    add_user = (name: string) => {
        let uuid: userID = this.gen_id();
        this.users[uuid] = name;
        this.friends[uuid] = [];
        this.locations[uuid] = [];
        return uuid;
    }

    get_friends = (uuid: userID) => {
        return this.friends[uuid]
    }

    make_friends = (p1_uuid: userID, p2_uuid: userID) => {
        this.friends[p1_uuid].push(p2_uuid);
        this.friends[p2_uuid].push(p1_uuid);
    }

    add_location = (uuid: userID, timestamp: number, location: Location) => {
        this.locations[uuid].push([timestamp, location]);
    }

    get_current_location = (uuid: userID) => {
        return this.locations[uuid][-1];
    }

    get_friends_current_location = (uuid: userID) => {
        return this.friends[uuid].map((uuid_2) => this.locations[uuid_2][-1][1])
    }

    dump = () => {
        console.log(`USERS: ${JSON.stringify(this.users)}`);
        console.log(`FRIENDS: ${JSON.stringify(this.friends)}`);
        console.log(`LOCS: ${JSON.stringify(this.locations)}`)
    }
}

export default HackyDatabase