import React, { createRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MainBackground from '../components/MainBackground';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
//componenrs
import Button from 'components/Button';
import ReceiptPicker from 'components/pickers/ReceiptPicker';
import Input from 'components/Input';
import DatePicker from 'components/pickers/DatePicker';
//styles
import GlobalStyles from '../styles/GlobalStyles';
//services
import Translation from '../core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import ApiService, { AxiosRequestConfig } from 'core/services/ApiService';

interface IState {
  loading: boolean;
}

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class ReceiptAddPage extends React.Component<IProps, IState> {
  state = {
    loading: false,
  };

  name = createRef<Input>();
  description = createRef<Input>();
  date = createRef<DatePicker>();
  receipt = createRef<ReceiptPicker>();

  apiRequest = async () => {
    if (!this.state.loading && this.validateData()) {
      const name = this.getName();
      const description = this.getDescription();
      const receipt_date = this.getDate() + 'T12:00';
      const image = await this.getReceipt();

      const data = {
        name,
        description,
        receipt_date,
        image,
      };

      const body: AxiosRequestConfig = {
        url: ApiService.Points.RECEIPT,
        method: 'POST',
        data,
      };

      try {
        await ApiService.request(body);
        if (this.props.navigation.getParam('refresh')) {
          this.props.navigation.getParam('refresh')();
        }
      } catch (error) {
        // console.log('error', error.response);
      } finally {
        NavigationService.goBack();
      }
    }
  };

  validateData = (): boolean => {
    const name = this.validateName();
    const description = this.validateDescription();
    const date = this.validateDate();
    const receipt = this.validateReceipt();
    return name && description && date && receipt;
  };

  validateName = (): boolean => {
    const input = this.name.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  validateDescription = (): boolean => {
    const input = this.description.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  validateDate = (): boolean => {
    const input = this.date.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  validateReceipt = (): boolean => {
    const ref = this.receipt.current;
    if (ref) {
      return ref.validate();
    }
    return false;
  };

  getReceipt = async (): Promise<string> => {
    const ref = this.receipt.current;
    if (ref) {
      return ref.getReceiptBase();
    }
    return '';
  };

  getName = (): string => {
    const input = this.name.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  getDescription = (): string => {
    const input = this.description.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  getDate = (): string => {
    const input = this.date.current;
    if (input) {
      return input.getStringValue();
    }
    return '';
  };

  render = () => (
    <MainBackground style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.pickerContainer}>
          <ReceiptPicker ref={this.receipt} />
        </View>
        <View>
          <Text style={[GlobalStyles.headerSmall, styles.header]}>
            {Translation.t('basic_info')}
          </Text>
          <Input ref={this.name} placeholder={Translation.t('name')} />
          <Input
            ref={this.description}
            placeholder={Translation.t('description')}
          />
          <DatePicker ref={this.date} placeholder={Translation.t('date')} />
          <Button
            onPress={this.apiRequest}
            style={styles.button}
            text={Translation.t('add_receipt')}
          />
        </View>
      </KeyboardAwareScrollView>
    </MainBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 35,
    justifyContent: 'space-between',
  },
  pickerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
  header: {
    marginBottom: 15,
  },
});
