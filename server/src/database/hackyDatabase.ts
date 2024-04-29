import crypto from 'crypto'
type UUID = string;

class Database {
    users: { [key: UUID]: string } = {};
    friends: { [key: UUID]: Array<UUID>} = {};
    locations: { [key: UUID]: Array<Array<number>> } = {};

    constructor () {}

    gen_id = () => {
        return crypto.randomBytes(4).toString('hex');
    }

    add_user = (name: string) => {
        let uuid: UUID = this.gen_id();
        this.users[uuid] = name;
        this.friends[uuid] = [];
        this.locations[uuid] = [];
        return uuid;
    }

    get_friends = (uuid: UUID) => {
        return this.friends[uuid]
    }

    add_friends = (p1_uuid: UUID, p2_uuid: UUID) => {
        this.friends[p1_uuid].push(p2_uuid);
        this.friends[p2_uuid].push(p1_uuid);
    }

    add_location = (uuid: UUID, timestamp: number, location: number) => {
        this.locations[uuid].push([timestamp, location]);
    }

    get_location = (uuid: UUID) => {
        return this.locations[uuid];
    }

    get_friends_location = (uuid: UUID) => {
        return this.friends[uuid].map((uuid_2) => this.locations[uuid_2])
    }

    print = () => {
        console.log(`USERS: ${JSON.stringify(this.users)}`);
        console.log(`FRIENDS: ${JSON.stringify(this.friends)}`);
        console.log(`LOCS: ${JSON.stringify(this.locations)}`)
    }
}

const database = new Database();

export default database;