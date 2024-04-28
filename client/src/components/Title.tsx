import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { useThemedStyles } from '@styles/UseThemedStyles';

type TitleProps = {
    title: string;
}

const Title = (props: TitleProps) => {
  const styles = useThemedStyles();
  return <Text style={styles.titleText}>{props.title}</Text>;
};

export default Title;
