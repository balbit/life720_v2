"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Database {
    constructor() {
        this.users = {};
        this.friends = {};
        this.locations = {};
        this.gen_id = () => {
            return crypto_1.default.randomBytes(4).toString('hex');
        };
        this.add_user = (name) => {
            let uuid = this.gen_id();
            this.users[uuid] = name;
            this.friends[uuid] = [];
            this.locations[uuid] = [];
            return uuid;
        };
        this.get_friends = (uuid) => {
            return this.friends[uuid];
        };
        this.add_friends = (p1_uuid, p2_uuid) => {
            this.friends[p1_uuid].push(p2_uuid);
            this.friends[p2_uuid].push(p1_uuid);
        };
        this.add_location = (uuid, timestamp, location) => {
            this.locations[uuid].push([timestamp, location]);
        };
        this.get_location = (uuid) => {
            return this.locations[uuid];
        };
        this.print = () => {
            console.log(`USERS: ${JSON.stringify(this.users)}`);
            console.log(`FRIENDS: ${JSON.stringify(this.friends)}`);
            console.log(`LOCS: ${JSON.stringify(this.locations)}`);
        };
    }
}
const database = new Database();
exports.default = database;
