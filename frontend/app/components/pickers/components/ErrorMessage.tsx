import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
//styles
import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';

interface IProps {
  error: string | null;
  style?: object;
  textStyle?: object;
}

const ErrorMessage = (props: IProps) =>
  props.error && props.error.length !== 0 ? (
    <View style={[styles.errorContainer, props.style]}>
      <Text style={[styles.errorText, props.textStyle]}>{props.error}</Text>
    </View>
  ) : null;

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    paddingVertical: 5,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.primary,
    marginTop: 5,
    marginLeft: 15,
  },
});
