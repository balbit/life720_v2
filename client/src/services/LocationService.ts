import Geolocation, {GeolocationResponse, GeolocationError} from '@react-native-community/geolocation';
import {Location, LocationInfo} from '@/../../common/types/types'


export function getLocation(timeout: number): Promise<LocationInfo> {
    Geolocation.requestAuthorization();

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => resolve({
                location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                timestamp: position.timestamp
                } as LocationInfo
            ), 
            (error) => reject(error),
            { enableHighAccuracy: false, timeout: timeout }
        );
        setTimeout(() => reject(new Error('Timeout')), timeout);
    });
}

export function getLocationWithCallback (successCallback: (location: Location) => void, errorCallback: (error: GeolocationError) => void, timeout: number): void {
    getLocation(timeout).then(
        (locationInfo) => {
            successCallback(locationInfo.location);
        }
    ).catch(
        (error) => {
            errorCallback(error);
        }
    )
};


