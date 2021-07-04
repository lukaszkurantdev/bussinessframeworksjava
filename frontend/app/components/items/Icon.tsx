import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import InsideIcon from './InsideIcon';
//icons
import { Icons } from '../../styles/Icons';

//styles
import Colors from '../../styles/Colors';

interface IProps {
  type: 'category' | 'account';
  size: 'micro' | 'small' | 'medium' | 'large';
  icon?: string;
  color?: string;
  onPress?: (icon: string, color: string) => void;
  isColorOnly?: boolean;
}

const CategoryIcon = (props: IProps) => {
  let size = 45;

  switch (props.size) {
    case 'micro':
      size = 30;
      break;
    case 'medium':
      size = 60;
      break;
    case 'large':
      size = 100;
      break;
  }

  const borderRadius = props.type === 'category' ? 100 : size / 5;

  const iconsTmp = Icons.filter(item => item.name === props.icon);
  const icon = iconsTmp.length !== 0 ? iconsTmp[0] : null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { height: size, width: size },
        props.size === 'large' && styles.whiteBorder,
        { borderRadius: borderRadius },
        { backgroundColor: props.isColorOnly ? props.color : 'transparent' },
      ]}
      activeOpacity={0.7}
      disabled={!props.onPress}>
      <InsideIcon
        icon={icon}
        size={size / 2}
        color={props.isColorOnly ? Colors.white : props.color}
      />
    </TouchableOpacity>
  );
};

export default CategoryIcon;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withColor: {
    borderWidth: 0,
  },
  whiteBorder: {
    borderColor: Colors.white,
  },
});
