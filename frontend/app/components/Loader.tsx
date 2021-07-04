import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
//styles
import Colors from '../styles/Colors';

const Loader = (_props: {children?: any}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
