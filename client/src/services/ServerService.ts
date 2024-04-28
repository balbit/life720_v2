import {Location} from '@utils/types.ts'

export const sendLocation = (location: Location) => {
fetch('http://10.29.191.69:3000/logger/', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    id: 'ishank',
    timestamp: 'Jan 15th',
    lat: location.latitude,
    long: location.longitude,
    }),
});
};