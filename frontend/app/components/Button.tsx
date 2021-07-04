import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

type type = 'Primary' | 'Secondary' | 'Tertiary' | 'TertiaryActive';

interface Props {
  text?: string;
  style?: object;
  containerStyle?: object;
  isSmallRound?: boolean;
  type?: type;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: object;
}

interface LinearGradientType {
  [key: string]: string[];
}

const linearGradientColor: LinearGradientType = {
  Primary: [Colors.primary, Colors.secondary],
  Secondary: [Colors.primary, Colors.primary],
  Tertiary: [Colors.white, Colors.white],
};

export default class Button extends React.PureComponent<Props> {
  locker: boolean = false;

  onPress = () => {
    if (!this.locker) {
      this.locker = true;
      if (this.props.onPress) {
        this.props.onPress();
      }
      setTimeout(() => (this.locker = false), 400);
    }
  };

  render = () => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          this.props.isSmallRound && styles.roundButton,
          this.props.containerStyle,
        ]}
        activeOpacity={0.5}
        disabled={this.props.disabled}
        onPress={this.onPress}>
        <LinearGradient
          colors={linearGradientColor[this.props.type || 'Primary']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.linearGradient, this.props.style]}>
          {this.props.children}
          {!this.props.loading ? (
            <Text
              style={[
                GlobalStyles.accountHeader,
                this.props.type !== 'Tertiary' && styles.whiteText,
                this.props.textStyle,
              ]}>
              {this.props.text && this.props.text.toUpperCase()}
            </Text>
          ) : (
            <ActivityIndicator
              color={
                this.props.type === 'Tertiary' ? Colors.primary : Colors.white
              }
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderRadius: 50,
  },
  linearGradient: {
    width: '100%',
    height: 45,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  roundButton: {
    height: 40,
    width: 40,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  whiteText: {
    color: Colors.white,
  },
});
