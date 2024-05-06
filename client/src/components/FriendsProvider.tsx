import React, { useState, useEffect } from 'react';
import MapWithFriends from './MapWithFriends'; // Assuming this is the map component
import {getFriendLocations} from '../services/ServerService';

interface Friend {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    profilePicture: string; // URL to the friend's profile picture
}

interface FriendsProviderProps {
    mapboxToken: string; // Pass the Mapbox access token
}

const FriendsProvider: React.FC<FriendsProviderProps> = ({ mapboxToken }) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const fetchInterval = 3 * 60 * 1000;

    const fetchFriendsData = async () => {
        try{
            const newFriends = await getFriendLocations();
            const friendsWithProfilePictures: Friend[] = newFriends.map(friend => ({
                id: 'hi',
                name: 'hi',
                latitude: friend.location.latitude,
                longitude: friend.location.longitude,
                profilePicture: `https://unsplash.com/photos/adK3Vu70DEQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGN1dGUlMjBhbmltYWx8ZW58MHx8fHwxNzE0OTE1NTU2fDA&force=true`
            }));
            setFriends(friendsWithProfilePictures);
            console.log(friendsWithProfilePictures.length);
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchFriendsData();

        const intervalId = setInterval(fetchFriendsData, fetchInterval);

        return () => clearInterval(intervalId);
    }, []);

    return <MapWithFriends friends={friends} mapboxToken={mapboxToken} />;
};

export default FriendsProvider;
