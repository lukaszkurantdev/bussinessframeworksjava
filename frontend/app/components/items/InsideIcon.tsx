import React from 'react';
//icons
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
//types
import {IIcon} from '../../styles/Icons';

interface IProps {
  icon: IIcon | null;
  color: string;
  size: number;
}

const Icon = (props: IProps) => {
  if (!props.icon) {
    return null;
  }

  switch (props.icon.type) {
    case 'Fontisto':
      return (
        <FontistoIcon
          name={props.icon.name}
          size={props.size}
          color={props.color}
        />
      );
    default:
      return (
        <IonIcon name={props.icon.name} size={props.size} color={props.color} />
      );
  }
};

export default Icon;
