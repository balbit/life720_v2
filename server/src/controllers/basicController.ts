import { Request, Response } from 'express';
// import database from '../database/Database';

import database from '../database/Database';

export const createUser = async (req: Request, res: Response) => {
    let id = await database.add_user(req.body.name);
    res.send({ "id": id });
}

export const addFriend = async (req: Request, res: Response) => {
    console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
    await database.make_friends(req.body.uuid, req.body.friend);
    res.sendStatus(200);
}

export const sendLocation = async (req: Request, res: Response) => {
    console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
    await database.add_location(req.body.uuid, req.body.timestamp, req.body.location);
    res.sendStatus(200);
}

export const getLocation = async (req: Request, res: Response) => {
    console.log(`GET_LOCATION: ${JSON.stringify(req.body)}`);
    res.send(await database.get_friends_current_location(req.body.uuid))
}