import { Request, Response } from 'express';
// import database from '../database/Database';
import {
    add_user,
    get_friends,
    make_friends,
    add_location,
    get_current_location,
    get_friends_current_location
} from '../models/basicModel';

export const createUser = async (req: Request, res: Response) => {
    let id = add_user(req.body.name);
    res.send({ "id": id });
}

export const addFriend = async (req: Request, res: Response) => {
    console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
    make_friends(req.body.uuid, req.body.friend);
    res.sendStatus(200);
}

export const sendLocation = async (req: Request, res: Response) => {
    console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
    add_location(req.body.uuid, req.body.timestamp, req.body.location);
    res.sendStatus(200);
}

export const getLocation = async (req: Request, res: Response) => {
    console.log(`GET_LOCATION: ${JSON.stringify(req.body)}`);
    res.send(get_friends_current_location(req.body.uuid))
}