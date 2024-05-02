import express from 'express';
import {sendLocation, getLocation, createUser, addFriend} from '../controllers/basicController';

const router = express.Router();

router.post('/createUser', createUser);
router.post('/addFriend', addFriend);
router.post('/sendLocoation', sendLocation);
router.get('/getLocation', getLocation)
export default router