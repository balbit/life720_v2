import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { useThemedStyles } from '@styles/UseThemedStyles';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {View, Image, Text} from 'react-native';

interface Friend {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    profilePicture: string; // URL to the friend's profile picture
}

interface MapWithFriendsProps {
    friends: Friend[];
    mapboxToken: string; // Your Mapbox access token
}

const MapWithFriends: React.FC<MapWithFriendsProps> = ({ friends, mapboxToken }) => {
    const defaultViewport = {
        latitude: friends[0]?.latitude || 37.7749, // Fallback to San Francisco
        longitude: friends[0]?.longitude || -122.4194,
        zoom: 10,
        bearing: 0,
        pitch: 0
    };

    const styles = useThemedStyles();

    return (
        <View style={styles.container}>
            <Text>
                {friends.length === 0 ? 'No friends found' : `Found ${friends[0].latitude}, ${friends[0].longitude}`}
            </Text>
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: 42.361,
                    longitude: -71.085,
                    latitudeDelta: 0.03, // Adjust to zoom appropriately
                    longitudeDelta: 0.03,
                }}
            >
            {friends.map(friend => (
                <Marker key={friend.id}
                 coordinate={{ latitude: friend.latitude, longitude: friend.longitude }}
                title={friend.name}>
                    <Image
                        source={{ uri: friend.profilePicture }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                </Marker>
            ))}
            </MapView>
        </View>
    );
};

export default MapWithFriends;
