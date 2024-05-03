import {userID} from '@/../../common/types/types'

let myID: userID | undefined = undefined;

export function getUserID(): userID {
    if (myID === undefined) {
        // TODO: Get user id from Firebase
        return "user-7ce7c2e4";
        // throw new Error('User ID not set');
    }

    return myID;
}