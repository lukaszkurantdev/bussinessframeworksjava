import React from 'react';
import { StyleSheet, View } from 'react-native';
//styles
import Colors from '../styles/Colors';

interface IProps {
  style?: Object;
  children?: any;
}

const MainBackground = (props: IProps) => (
  <View style={[styles.container, props.style]}>{props.children}</View>
);

export default MainBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.gray,
  },
});
