import React from 'react';
import { StyleSheet, View } from 'react-native';
//componenets
import CategoryIcon from '../items/Icon';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import ErrorMessage from './components/ErrorMessage';
//services
import TranslationService from '../../core/services/TranslationService';

interface IProps {
  type: 'category' | 'account';
}

interface IState {
  color: string | undefined;
  icon: string | undefined;
  validationError: boolean;
}

export default class ComplexIconPicker extends React.Component<IProps, IState> {
  state: IState = {
    validationError: false,
    color: undefined,
    icon: undefined,
  };

  colorPickerRef = React.createRef<ColorPicker>();
  iconPickerRef = React.createRef<IconPicker>();

  public getValues = (): {
    color: string | undefined;
    icon: string | undefined;
  } => {
    const { color, icon } = this.state;
    return { color, icon };
  };

  public setValues = (icon: string, color: string) => {
    const iconPicker = this.iconPickerRef.current;
    const colorPicker = this.colorPickerRef.current;
    if (iconPicker && colorPicker) {
      iconPicker.setValue(icon);
      colorPicker.setValue(icon);
    }

    this.setState({ color, icon });
  };

  public validate = (): boolean => {
    if (!this.state.color || !this.state.icon) {
      const iconPicker = this.iconPickerRef.current;
      const colorPicker = this.colorPickerRef.current;
      if (iconPicker && colorPicker) {
        iconPicker.validate();
        colorPicker.validate();
        this.setState({ validationError: true });
      }
      return false;
    }
    return true;
  };

  onChangeIconColor = (value: string) => {
    this.setState({ color: value, validationError: false });
  };

  onChangeIcon = (value: string) => {
    this.setState({ icon: value, validationError: false });
  };

  render = () => {
    return (
      <View style={styles.topContainer}>
        <View style={styles.centerConatiner}>
          <CategoryIcon
            type={this.props.type}
            size={'large'}
            color={this.state.color}
            icon={this.state.icon}
          />
        </View>
        <View style={styles.rowContainer}>
          <ColorPicker
            ref={this.colorPickerRef}
            placeholder={TranslationService.t('color').toLowerCase()}
            type={this.props.type}
            onChange={this.onChangeIconColor}
            style={styles.flex1}
          />
          <View style={styles.separator} />
          <IconPicker
            ref={this.iconPickerRef}
            placeholder={TranslationService.t('icon')}
            type={this.props.type}
            onChange={this.onChangeIcon}
            style={styles.flex1}
          />
        </View>
        {this.state.validationError && (
          <ErrorMessage error={TranslationService.t('icon_error')} />
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  topContainer: {},
  centerConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  separator: {
    width: 15,
  },
  flex1: {
    flex: 1,
  },
});
