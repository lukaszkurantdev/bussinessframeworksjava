import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { IIcon, Icons, IconBackgroundColors } from '../styles/Icons';
//styles
import Colors from '../styles/Colors';

interface IProps {
  source: IIcon;
  backgroundColor: string;
  iconSize?: number;
  containerStyle?: object;
}

const Icon = (props: IProps) => (
  <View
    style={[
      styles.iconContainer,
      { backgroundColor: props.backgroundColor },
      props.containerStyle,
    ]}>
    {props.source.type === 'Fontisto' && (
      <IconFontisto
        name={props.source.name}
        color={Colors.white}
        size={props.iconSize || 25}
      />
    )}
    {props.source.type === 'Ionicons' && (
      <IconIonicon
        name={props.source.name}
        color={Colors.white}
        size={props.iconSize || 25}
      />
    )}
  </View>
);

export default Icon;
export { IconBackgroundColors, Icons };

const styles = StyleSheet.create({
  iconContainer: {
    height: 55,
    width: 55,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
