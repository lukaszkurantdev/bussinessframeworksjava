import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
//components
import ErrorMessage from './ErrorMessage';
//styles
import GlobalStyles from '../../../styles/GlobalStyles';
import Colors from '../../../styles/Colors';

interface IProps {
  value: string | null;
  placeholder: string;
  error: string | null;
  onPress?: () => void;
  validationError?: boolean;
  style?: Object;
}

const PickerBody = (props: IProps) => {
  const isValue = props.value !== null && props.value.length !== 0;
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          props.style,
          props.validationError && styles.validationError,
        ]}
        onPress={props.onPress}
        activeOpacity={0.8}>
        <Text style={[GlobalStyles.buttonText, !isValue && styles.grayText]}>
          {isValue ? props.value : props.placeholder}
        </Text>
      </TouchableOpacity>
      <ErrorMessage error={props.error} />
    </>
  );
};

export default PickerBody;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  grayText: {
    color: Colors.graySecondary,
  },
  validationError: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});
