import { Request, Response } from 'express';
import database from '../database/hackyDatabase'

export const createUser = async (req: Request, res: Response) => {
    console.log(`CREATE_USER: ${JSON.stringify(req.body)}`);
    let uuid = database.add_user(req.body.name);
    res.send({ "uuid": uuid })
    database.print();
}

export const addFriend = async (req: Request, res: Response) => {
    console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
    database.add_friends(req.body.uuid, req.body.friend);
    res.sendStatus(200);
    database.print();
}

export const sendLocation = async (req: Request, res: Response) => {
    console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
    database.add_location(req.body.uuid, req.body.timestamp, req.body.location);
    res.sendStatus(200);
    database.print();
}

export const getLocation = async (req: Request, res: Response) => {
    console.log(`GET_LOCATION: ${JSON.stringify(req.body)}`);
    res.send(database.get_friends_location(req.body.uuid))
    database.print();
}