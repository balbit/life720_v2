import express from 'express';
import {sendLocation, getLocation, getFriendLocations, createUser, addFriend} from '../controllers/basicController';

const router = express.Router();

router.post('/createUser', createUser);
router.post('/addFriend', addFriend);
router.post('/sendLocation', sendLocation);
router.get('/getLocation', getLocation);
router.get('/getFriendLocations', getFriendLocations);
export default router