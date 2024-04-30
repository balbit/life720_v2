import { Request, Response } from 'express';
import database from '../database/Database';
import {add_user} from '../models/basicModel';

export const createUser = async (req: Request, res: Response) => {
    // console.log(`CREATE_USER: ${JSON.stringify(req.body)}`);
    // let uuid = database.add_user(req.body.name);
    // res.send({ "uuid": uuid })
    // database.dump();
    let id = add_user(req.body.name);
    res.send({ "id": id });
}

export const addFriend = async (req: Request, res: Response) => {
    console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
    database.make_friends(req.body.uuid, req.body.friend);
    res.sendStatus(200);
    database.dump();
}

export const sendLocation = async (req: Request, res: Response) => {
    console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
    database.add_location(req.body.uuid, req.body.timestamp, req.body.location);
    res.sendStatus(200);
    database.dump();
}

export const getLocation = async (req: Request, res: Response) => {
    console.log(`GET_LOCATION: ${JSON.stringify(req.body)}`);
    res.send(database.get_friends_current_location(req.body.uuid))
    database.dump();
}