import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
//styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
//assets
import TranslationService from '../core/services/TranslationService';
import GlobalStyles from 'styles/GlobalStyles';

interface IProps {
  value?: string;
  isSearchLeft?: boolean;
  onBlur?: () => void;
  getValue?: () => string;
  isValueHidden?: boolean;
  placeholder?: string;
  isBlackBorder?: boolean;
  changeFunc?: () => any;
  isWrong?: boolean;
  style?: object;
  containerStyle?: object;
  name?: string;
  alert?: string;
  validationFuncParam?: string;
  isWhite?: boolean;
}

interface IState {
  value: string;
  isNotVisible: boolean | undefined;
  isInputActive: boolean;
  isAlertVisible: boolean;
  alertText?: string;
}

interface IInputValidation {
  alert: string;
  validation: RegExp;
}

interface IInputListValidation {
  [key: string]: IInputValidation;
}

const regexes: IInputListValidation = {
  email: {
    validation: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-+]+)*@[a-zA-Z0-9-]{1,60}(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/,
    alert: TranslationService.t('invalid_email_address'),
  },
  password: {
    validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[1-9]).{8,32}$/,
    alert: TranslationService.t('invalid_password'),
  },
};

export default class SearchInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value || '',
      isNotVisible: props.isValueHidden,
      isInputActive: false,
      isAlertVisible: false,
    };
  }

  handleChange = (value: string): void => {
    this.setState({
      value,
    });
  };

  handleShowIsFocus = () => {
    this.setState({
      isInputActive: true,
      isAlertVisible: false,
    });
  };

  handleBlur = () => {
    this.setState({
      isInputActive: false,
    });
  };

  handleManageOfChange = (value: string) => {
    this.handleChange(value);
    this.props.changeFunc && this.props.changeFunc();
  };

  handleBlurManage = () => {
    !this.state.value && this.props.onBlur && this.props.onBlur();
    this.handleBlur();
  };

  validate = (): boolean => {
    if (this.props.name) {
      let booleanValue = regexes[this.props.name].validation.test(
        this.state.value
      );

      this.setState({
        isAlertVisible: !booleanValue,
        alertText: !booleanValue ? regexes[this.props.name].alert : '',
      });

      return booleanValue;
    } else if (!this.state.value && !this.props.name) {
      this.setState({
        isAlertVisible: true,
        alertText: TranslationService.t('empty_input'),
      });
      return false;
    } else if (this.state.value && !this.props.name) {
      this.setState({
        isAlertVisible: false,
      });
      return true;
    }

    return true;
  };

  handleGetValue = () => {
    return this.state.value;
  };

  printAlertText = (value?: string) => {
    if (this.props.name && value) {
      this.setState({
        isAlertVisible: true,
        alertText: value,
      });
    } else if (!this.props.name) {
      this.setState({
        alertText: TranslationService.t('invalid_field_value'),
      });
    }
  };

  render = () => {
    return (
      <View style={[styles.mainContainer, this.props.containerStyle]}>
        <View
          style={[
            styles.modeContainer,
            this.state.isAlertVisible && styles.borderBottomPinkyRed,
            this.props.style,
          ]}>
          <TextInput
            selectionColor={Colors.gray}
            //@ts-ignore
            tintColor={Colors.gray}
            style={[GlobalStyles.buttonText, styles.textInput]}
            value={this.state.value}
            onChangeText={this.handleManageOfChange}
            onBlur={this.handleBlurManage}
            onFocus={this.handleShowIsFocus}
            secureTextEntry={this.state.isNotVisible}
            placeholder={this.props.placeholder}
            placeholderTextColor={Colors.graySecondary}
          />
        </View>
        {this.state.isAlertVisible && (
          <Text style={styles.alertText}>{this.state.alertText}</Text>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    // marginBottom: 15,
    marginTop: 15,
  },
  marginRight: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 29,
  },
  textInput: {
    color: Colors.black,
    flex: 1,
    paddingVertical: 15,
    height: 50,
    paddingHorizontal: 0,
  },
  placeholderStyle: {
    color: Colors.black,
    fontSize: 18,
    letterSpacing: 0.24,
    fontFamily: Fonts.regular,
    padding: 0,
    margin: 0,
  },
  modeContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  workoutTitle: {
    color: Colors.graySecondary,
  },
  topInputContainer: {
    width: '100%',
  },
  borderBottomPrimary: {
    borderBottomColor: Colors.primary,
  },
  borderBottomPinkyRed: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  alertText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.primary,
    marginTop: 5,
    marginLeft: 15,
  },
  pinkyRedText: {
    color: Colors.primary,
  },
});
