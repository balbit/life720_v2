/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import type {PropsWithChildren} from 'react';
import {hello_world} from '@utils/hello_world.ts';

import Title from '@components/Title'
import LocationInfo from '@components/LocationInfo';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  Alert
} from 'react-native';


const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function App(): React.JSX.Element {
  hello_world("Ishank");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [num, setNum] = useState(0);

  let update_location = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        console.log('got location!', num);

        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setNum(num + 1);

        fetch('http://10.29.191.69:3000/logger/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 'ishank',
            timestamp: 'Jan 15th',
            lat: lat,
            long: long,
          }),
        });

      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: false, timeout: 20000}
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Title title="Life720" />

      <View style={{margin: 20}}>
        <Button
          title="Update Location"
          onPress={() => {
            update_location();
          }}
          color="black"/>
      </View>

      <LocationInfo latitude={lat} longitude={long} />
    </View>
  );
}

export default App;
