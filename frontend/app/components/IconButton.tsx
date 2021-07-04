import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//models
import { Icon } from 'core/models/Menu.model';

//svg
import {
  SvgCard,
  SvgIcon,
  SvgBasket,
  SvgBarcode,
  SvgStats,
  SvgSettings,
  SvgLogout,
} from 'assets/svg';

const width = 25;

interface IProps {
  icon?: Icon;
  text: string;
  style?: object;
  textStyle?: object;
  onPress?: (item: any) => void;
  disable?: boolean;
}

export default class IconButton extends React.Component<IProps> {
  renderIcon = () => {
    switch (this.props.icon) {
      case 'Barcode':
        return (
          <SvgBarcode
            style={styles.icon}
            color={Colors.primary}
            width={width}
          />
        );
      case 'Account':
        return (
          <SvgIcon style={styles.icon} color={Colors.primary} width={width} />
        );
      case 'Category':
        return (
          <SvgBasket style={styles.icon} color={Colors.primary} width={width} />
        );
      case 'Logout':
        return (
          <SvgLogout style={styles.icon} color={Colors.primary} width={width} />
        );
      case 'Card':
        return (
          <SvgCard style={styles.icon} color={Colors.primary} width={width} />
        );
      case 'Setting':
        return (
          <SvgSettings
            style={styles.icon}
            color={Colors.primary}
            width={width}
          />
        );
      case 'Statistic':
        return (
          <Icons
            name={'ios-stats'}
            style={styles.icon}
            color={Colors.primary}
            size={width}
          />
        );
      default:
        return null;
    }
  };

  render = () => (
    <Animatable.View
      style={styles.itemContainer}
      animation="fadeIn"
      duration={500}
      useNativeDriver>
      <TouchableOpacity
        disabled={this.props.disable}
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.item, this.props.style]}>
        <View style={styles.insideItemContainer}>
          {this.renderIcon()}
          <View style={styles.textItemContainer}>
            <Text style={[GlobalStyles.buttonText, this.props.textStyle]}>
              {this.props.text}
            </Text>
            {this.props.children}
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  itemContainer: {
    borderRadius: 10,
    marginVertical: 7,
    overflow: 'hidden',
  },
  item: {
    height: 60,
    backgroundColor: Colors.itemGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  insideItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
