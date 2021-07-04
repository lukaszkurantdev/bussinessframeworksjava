import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SvgCheck } from 'assets/svg';
import Colors from 'styles/Colors';

interface IState {
  checked: boolean;
}

interface IProps {
  style?: object;
}

export default class CheckBoxComponent extends React.Component<IProps, IState> {
  state = {
    checked: false,
  };

  change = () => {
    this.setState({ checked: !this.state.checked });
  };

  getState = (): boolean => {
    return this.state.checked;
  };

  render = () => (
    <TouchableOpacity
      onPress={this.change}
      style={[styles.container, this.props.style]}>
      {this.state.checked && <SvgCheck />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLightSec,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
});
