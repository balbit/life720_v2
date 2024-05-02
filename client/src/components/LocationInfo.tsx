import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useThemedStyles } from '@styles/UseThemedStyles';
import { Location } from '@/../../common/types/types';


const LocationInfo = ({latitude, longitude}: Location) => {
  const style = useThemedStyles();
  return (
    <View>
      <Text style={style.bodyText}>Latitude: {latitude}</Text>
      <Text style={style.bodyText}>Longitude: {longitude}</Text>
    </View>
  );
};

export default LocationInfo;
