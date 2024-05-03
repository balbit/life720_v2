import {LocationInfo, Location} from '@/../../common/types/types'
import {SendLocationRequest} from '@/../../common/types/requests'
import { getUserID } from './UserService';
import {Config} from 'react-native-config'

function serverAPILink(route: string): string {
    const isProduction = process.env.NODE_ENV === 'prod';
    const constants = Config.getConstants;
    console.log(constants);
    console.log(Config);
    if (isProduction) {
        throw new Error('Production API link not set');
    } else {
        const LOCAL_IP = process.env.LOCAL_IP;
        const PORT = 3000;
        const link = `http://${LOCAL_IP}:${PORT}/api/v1/` + route;
        console.log(`API link: ${link}`);
        return link;
    }
}

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

    try {
        const response = await fetch(serverAPILink('sendLocation/'), requestInit);
        if (!response.ok) {
            console.error(`Failed to send location: ${response.statusText}`);
            throw new Error(`Failed to send location: ${response.statusText}`);
        }
        console.log(`Successfully sent location: ${location.latitude}, ${location.longitude}`)
    } catch (error) {
        console.error(error);
    }
}
