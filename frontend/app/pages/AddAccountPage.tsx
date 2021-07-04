import React from 'react';
import { Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
//components
import MainBackground from '../components/MainBackground';
import AmountPicker from '../components/pickers/AmountPicker';
import Button from '../components/Button';
import Input from '../components/Input';
import ComplexIconPicker from 'components/pickers/ComplexIconPicker';
import Picker from 'components/pickers/Picker';
import Error from 'components/Error';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';
//models
import { Account } from 'core/models/Account.model';
import { AxiosRequestConfig } from 'axios';
import ApiService from 'core/services/ApiService';
import NavigationService from 'core/services/NavigationService';

interface IState {
  loading: boolean;
  icon: string | undefined;
  iconColor: string | undefined;
  mode: 'add' | 'edit';
  account: Account | null;
  sameObjectError: boolean;
  fetching: boolean;
}

interface IProps {
  navigation: any;
}

export default class AddAccountPage extends React.Component<IProps, IState> {
  state: IState = {
    loading: true,
    iconColor: undefined,
    icon: undefined,
    mode: this.props.navigation.getParam('mode'),
    account: this.props.navigation.getParam('account'),
    sameObjectError: false,
    fetching: false,
  };

  nameInputRef = React.createRef<Input>();
  iconPickerRef = React.createRef<ComplexIconPicker>();
  amountPickerRef = React.createRef<AmountPicker>();
  currencyPickerRef = React.createRef<Picker>();

  componentDidMount = () => {
    if (this.state.mode === 'edit' && this.state.account !== null) {
      this.setValues(this.state.account);
    }
  };

  setValues = (account: Account) => {
    const nameInput = this.nameInputRef.current;
    const iconPicker = this.iconPickerRef.current;
    const amountPicker = this.amountPickerRef.current;
    const currencyPicker = this.currencyPickerRef.current;

    if (nameInput && iconPicker && amountPicker && currencyPicker) {
      nameInput.handleChange(account.name);
      iconPicker.setValues(account.icon, account.color);
      currencyPicker.setValue(account.currency);
    }
  };

  setData = async () => {
    this.setState({ fetching: true, sameObjectError: false });

    const nameInput = this.nameInputRef.current;
    const iconPicker = this.iconPickerRef.current;
    const amountPicker = this.amountPickerRef.current;

    if (nameInput && iconPicker && amountPicker) {
      const validations = [nameInput.validate(), iconPicker.validate()];

      console.log(validations);
      if (validations.filter(v => !v).length === 0) {
        const name = nameInput.handleGetValue();
        const { color, icon } = iconPicker.getValues();
        const initialValue = amountPicker.getValue();

        const { mode, account } = this.state;

        let data = {
          name,
          icon,
          color,
          initialValue,
          id: mode === 'edit' ? account?.id : undefined,
        };

        console.log(data);

        const body: AxiosRequestConfig = {
          url: ApiService.Points.ACCOUNTS,
          method: mode === 'edit' ? 'PUT' : 'POST',
          data,
        };

        try {
          const response = await ApiService.request(body);
          console.log(response.data);

          if (response.status === 400) {
            this.setState({ sameObjectError: true, fetching: false });
          } else {
            this.props.navigation.getParam('refresh')();
            NavigationService.goBack();
          }
        } catch (error) {
          if (error.response.status === 400) {
            this.setState({ sameObjectError: true });
          }
          this.setState({ fetching: false });
          console.log('error', error.response.status);
        }
      } else {
        this.setState({ fetching: false, sameObjectError: false });
      }
    }
  };

  onChangeIconColor = (value: string) => {
    console.log(value);
    this.setState({ iconColor: value });
  };

  onChangeIcon = (value: string) => {
    this.setState({ icon: value });
  };

  render() {
    return (
      <MainBackground>
        <ScrollView style={GlobalStyles.mainPadding}>
          <StatusBar
            backgroundColor={Colors.gray}
            barStyle={'dark-content'}
            translucent={false}
          />
          {this.state.sameObjectError && (
            <Error text={TranslationService.t('same_account_error')} />
          )}

          <ComplexIconPicker ref={this.iconPickerRef} type={'account'} />

          <Text style={[GlobalStyles.accountHeader, styles.header]}>
            {TranslationService.t('primary_info')}
          </Text>
          <Input
            ref={this.nameInputRef}
            placeholder={TranslationService.t('name')}
          />
          <AmountPicker
            ref={this.amountPickerRef}
            placeholder={TranslationService.t('starting_balance')}
          />
          <Button
            text={
              this.state.mode === 'add'
                ? TranslationService.t('add_account')
                : TranslationService.t('save_changes')
            }
            onPress={this.setData}
            loading={this.state.fetching}
          />
        </ScrollView>
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
});
