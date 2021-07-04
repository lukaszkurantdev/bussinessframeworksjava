import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//componenets
import PickerBody from './components/PickerBody';
import Modal from '../Modal';
import Button from '../Button';
import IoniIcon from 'react-native-vector-icons/Ionicons';
//services
import TranslationService from '../../core/services/TranslationService';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

interface IProps {
  placeholder: string;
  currency?: string;
  onChange?: (value: number | null) => void;
}

interface IState {
  value: string | null;
  valueTemporary: string | null;
  errorMessage: string | null;
}

export default class AmountPicker extends React.Component<IProps, IState> {
  state: IState = {
    value: null,
    valueTemporary: null,
    errorMessage: null,
  };

  modal = React.createRef<Modal>();

  public getValue = (): number => {
    return this.state.value === null
      ? 0
      : parseFloat(this.state.value.replace(',', '.'));
  };

  public setValue = (value: number) => {
    const v = value.toString().replace('.', ',');
    this.setState({ value: v, valueTemporary: v });
  };

  toggleModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.toggleModal();
      if (this.state.value === null) {
        this.setState({ valueTemporary: null });
      }
    }
  };

  public validate = () => {
    if (this.state.value === null) {
      this.setState({ errorMessage: TranslationService.t('empty_input') });
    }

    return this.state.value !== null;
  };

  private onChange = () => {
    const value = this.state.valueTemporary;

    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }

    this.setState(
      { value: value === null ? '0' : value, errorMessage: null },
      () => {
        this.toggleModal();
      }
    );
  };

  chooseValue = (value: string) => {
    let v = this.state.valueTemporary;
    v = v === null ? '0' : v;
    const commaIndex = v.indexOf(',');

    if (v.length < 11) {
      if (value === ',') {
        if (commaIndex === -1) {
          v += ',';
          this.setState({ valueTemporary: v });
        }
      } else {
        if (commaIndex !== -1) {
          const lastIndex = v.length - 1;
          if (lastIndex - commaIndex < 2) {
            v += value;
          }
        } else {
          if (v === '0') {
            v = value;
          } else {
            v += value;
          }
        }
        this.setState({ valueTemporary: v });
      }
    }
  };

  removeSign = () => {
    let v = this.state.valueTemporary;
    if (v !== null) {
      v = v.slice(0, -1);
      if (v.length === 0) {
        v = '0';
      }
      this.setState({ valueTemporary: v });
    }
  };

  renderButton = (sign: string) => (
    <TouchableOpacity
      style={[styles.buttonCalc, sign === '' && styles.hidden]}
      activeOpacity={0.7}
      onPress={() => this.chooseValue(sign)}
      disabled={sign === ''}>
      <Text style={[GlobalStyles.headerBig, styles.darkText]}>{sign}</Text>
    </TouchableOpacity>
  );

  render = () => {
    let value = this.state.value;
    // === null ? this.props.placeholder : this.state.value

    if (this.props.currency && this.state.value !== null) {
      value += ' ' + this.props.currency;
    }

    return (
      <>
        <PickerBody
          value={value}
          placeholder={this.props.placeholder}
          error={this.state.errorMessage}
          onPress={this.toggleModal}
          validationError={!!this.state.errorMessage}
        />

        <Modal ref={this.modal} title={TranslationService.t('amount')}>
          <View style={styles.spaceBetweenContainer}>
            <TouchableOpacity
              onPress={this.removeSign}
              hitSlop={{ bottom: 15, top: 15, left: 15, right: 15 }}>
              <IoniIcon name="ios-backspace" size={30} color={Colors.dotGray} />
            </TouchableOpacity>
            <Text style={[GlobalStyles.headerBig, styles.darkText]}>
              {this.state.valueTemporary === null
                ? '0'
                : this.state.valueTemporary}{' '}
              {this.props.currency}
            </Text>
          </View>

          {CalcSigns.map(c => (
            <View style={styles.rowContainer}>
              {c.map(v => this.renderButton(v))}
            </View>
          ))}

          <Button
            text={TranslationService.t('select')}
            type={'Primary'}
            onPress={this.onChange}
            style={styles.buttonContainer}
          />
        </Modal>
      </>
    );
  };
}

const CalcSigns = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', ','],
];

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between',
  },
  spaceBetweenContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    // marginHorizontal: 15,
    width: WIDTH - 30,
  },
  buttonCalc: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
  darkText: {
    color: Colors.whiteSecondary,
  },
});
