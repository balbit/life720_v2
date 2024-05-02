import Geolocation, {GeolocationError} from '@react-native-community/geolocation';
import {Location} from '@/../../common/types/types'

export const getLocation = (successCallback: (location: Location) => void, errorCallback: (error: GeolocationError) => void, timeout: number) => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        successCallback(location);
      },
      error => {
        errorCallback(error);
      },
      { enableHighAccuracy: false, timeout: timeout }
    );
  };