import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
//styles
import Colors from 'styles/Colors';
import Fonts from 'styles/Fonts';

interface IProps {
  text: string | null;
}

const Error = (props: IProps) =>
  props.text && props.text.length !== 0 ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.text}</Text>
    </View>
  ) : null;

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    paddingVertical: 15,
    backgroundColor: Colors.white,
    marginBottom: 25,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 15,
  },
});
