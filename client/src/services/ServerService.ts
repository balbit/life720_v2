import {LocationInfo, Location} from '@/../../common/types/types'
import {SendLocationRequest} from '@/../../common/types/requests'
import { getUserID } from './UserService';

export async function sendLocation(locationInfo: LocationInfo): Promise<void> {
    const location = locationInfo.location;
    console.log(`Sending location: ${location.latitude}, ${location.longitude}`);

    const sendLocationRequest: SendLocationRequest = {
        userID: getUserID(),
        locationInfo: locationInfo
    }

    const requestInit: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendLocationRequest)
    }

    const LOCAL_IP = process.env.LOCAL_IP; 
    // TODO: Make request work for both local testing and production
    // remember that localhost on the phone is not the same as localhost on the computer

    try {
        const response = await fetch(`http://${LOCAL_IP}:3000/api/v1/sendLocation/`, requestInit);
        if (!response.ok) {
            console.error(`Failed to send location: ${response.statusText}`);
            throw new Error(`Failed to send location: ${response.statusText}`);
        }
        console.log(`Successfully sent location: ${location.latitude}, ${location.longitude}`)
    } catch (error) {
        console.error(error);
    }

    // if (!response.status.toString().startsWith('2')) {
    //     throw new Error(`Error ${response.status} Failed to send location: ${response.statusText}`);
    // }
}
