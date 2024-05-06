/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from '@screens/HomeScreen';
import { ThemeProvider } from '@styles/ThemeContext';
import FriendsProvider from '@components/FriendsProvider';
import {View, Text} from 'react-native';

function App(): React.JSX.Element {
  console.log(process.env);
  console.log(process.env.LOCAL_IP);
  const mapboxToken = process.env.MAPBOX_TOKEN;
  return (
    <ThemeProvider>
      <Text>
        Hello
      </Text>
      <FriendsProvider mapboxToken={mapboxToken??""} />
      {/* <HomeScreen /> */}
    </ThemeProvider>
  )
}

export default App;
