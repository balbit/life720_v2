import React from 'react';
import {Text, StyleSheet} from 'react-native';

type TitleProps = {
    title: string;
}

const Title = (props: TitleProps) => {
  return <Text style={styles.title}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Title;
