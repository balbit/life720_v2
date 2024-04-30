import express from 'express';
import {sendLocation, getLocation, createUser, addFriend} from '../controllers/basicController';

const router = express.Router();

router.post('/createuser', createUser);
router.post('/addfriend', addFriend);
router.post('/sendloc', sendLocation);
router.get('/getloc', getLocation)
export default router