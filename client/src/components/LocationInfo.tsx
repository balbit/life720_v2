import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type LocationInfoProps = {
  latitude: number,
  longitude: number,
}

const LocationInfo = ({latitude, longitude}: LocationInfoProps) => {
  return (
    <View>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // add styles later ?!?
});

export default LocationInfo;
