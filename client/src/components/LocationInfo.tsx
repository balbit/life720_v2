import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useThemedStyles } from '@styles/UseThemedStyles';

type LocationInfoProps = {
  latitude: number,
  longitude: number,
}

const LocationInfo = ({latitude, longitude}: LocationInfoProps) => {
  const style = useThemedStyles();
  return (
    <View>
      <Text style={style.bodyText}>Latitude: {latitude}</Text>
      <Text style={style.bodyText}>Longitude: {longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // add styles later ?!?
});

export default LocationInfo;
