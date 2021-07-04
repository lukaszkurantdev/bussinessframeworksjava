import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../../styles/Colors';

const RightButtons = (
  leftButtonPress = () => {},
  rightButtonPress = () => {},
) => [
  <TouchableOpacity
    key={0}
    style={styles.swipeableButtonContainer}
    onPress={leftButtonPress}>
    <Icon name="ios-create" color={Colors.white} size={25} />
  </TouchableOpacity>,
  <TouchableOpacity
    key={1}
    style={styles.swipeableButtonContainer}
    onPress={rightButtonPress}>
    <Icon name="ios-trash" color={Colors.secondary} size={25} />
  </TouchableOpacity>,
];

export default RightButtons;

const styles = StyleSheet.create({
  swipeableButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
  },
});
