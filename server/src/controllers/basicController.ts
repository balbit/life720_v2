import { Request, Response } from 'express';
// import database from '../database/Database';
import { CreateUserRequest, AddFriendRequest, SendLocationRequest, GetLocationRequest, GetLocationResponse, ErrorResponse } from '@/../../../common/types/requests';

import database from '../database/Database';

export const createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
    try {
        const id = await database.addUser(req.body.name);
        res.send({ id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
};

export const addFriend = async (req: Request<{}, {}, AddFriendRequest>, res: Response) => {
    try {
        console.log(`ADD_FRIEND: ${JSON.stringify(req.body)}`);
        await database.makeFriends(req.body.userID, req.body.friend);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error adding friend:', error);
        if (error instanceof ReferenceError) {
            res.status(404).send('User not found');
        } else {
            res.status(500).send('Internal server error');
        }
    }
};

export const sendLocation = async (req: Request<{}, {}, SendLocationRequest>, res: Response) => {
    try {
        console.log(`SEND_LOCATION: ${JSON.stringify(req.body)}`);
        await database.addLocation(req.body.userID, req.body.locationInfo);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending location:', error);
        if (error instanceof ReferenceError) {
            res.status(404).send('User not found');
        } else {
            res.status(500).send('Internal server error');
        }
    }
};

export const getLocation = async (req: Request<GetLocationRequest>, res: Response<GetLocationResponse | ErrorResponse>) => {
    try {
        console.log(`GET_LOCATION: ${JSON.stringify(req.query)}`);
        if (typeof req.query.userID !== 'string' || req.query.userID === '') {
            throw new ReferenceError("Invalid user ID");
        }
        const locations = await database.getFriendsCurrentLocation(req.query.userID);
        res.status(200).send({ locations });
    } catch (error) {
        console.error('Error getting location:', error);
        if (error instanceof ReferenceError) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
};