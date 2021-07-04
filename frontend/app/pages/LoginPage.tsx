import React, { createRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//components
import Button from 'components/Button';
import Input from 'components/Input';
import MainBackgorund from 'components/MainBackground';
import Modal from 'components/Modal';

//services
import Translation from 'core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import ApiService, { AxiosRequestConfig } from 'core/services/ApiService';
import UserService from 'core/services/UserService';
//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';
//svg
import { SvgLogo } from 'assets/svg';

interface IState {
  isLoading: boolean;
  message: string;
}

export default class LoginPage extends React.Component<{}, IState> {
  state: IState = {
    isLoading: false,
    message: '',
  };

  emailInput = createRef<Input>();
  passwordInput = createRef<Input>();
  modal = createRef<Modal>();

  toggleModal = (message: string = '') => {
    let modal = this.modal.current;
    this.setState({ message }, () => {
      if (modal) {
        modal.toggleModal();
      }
    });
  };

  login = async () => {
    if (this.validateInputs()) {
      this.setState({ isLoading: true });
      let username = this.getEmail();
      let password = this.getPassword();

      let loginData: { [key in string]: string } = {
        username,
        password,
      };

      let body: AxiosRequestConfig = {
        url: ApiService.Points.LOGIN,
        method: 'POST',
        data: loginData,
      };
      try {
        let response = await ApiService.request(body);

        UserService.login(
          response.data.token,
          response.data.token,
          response.data.roles
        );
      } catch (error) {
        this.setState({ isLoading: false });
        this.toggleModal(Translation.t('incorrect_login_data'));
      }
    }
  };

  navigationToForgotPasswordPage = (): void => {
    NavigationService.mainNavigate('ForgotPasswordPage');
  };

  navigationToRegistryPage = (): void => {
    NavigationService.mainNavigate('RegistryPage');
  };

  validateInputs = (): boolean => {
    let email = this.validateEmail();
    let password = this.validatePassword();
    return email && password;
  };

  validateEmail = (): boolean => {
    const input = this.emailInput.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  validatePassword = (): boolean => {
    const input = this.passwordInput.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  getEmail = (): string => {
    const input = this.emailInput.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  getPassword = (): string => {
    const input = this.passwordInput.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={[GlobalStyles.headerMedium, styles.messageText]}>
        {this.state.message}
      </Text>
    </View>
  );

  render = () => (
    <MainBackgorund style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.topContainer}>
          <SvgLogo />
          <Text style={[GlobalStyles.headerBig, styles.headerText]}>
            {Translation.t('uCash')}
          </Text>
          <Text style={GlobalStyles.headerSmall}>
            {Translation.t('your_own_finance')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input ref={this.emailInput} placeholder={Translation.t('email')} />
          <Input
            containerStyle={styles.inputStyle}
            ref={this.passwordInput}
            isValueHidden
            placeholder={Translation.t('password')}
          />
          <Text
            style={[GlobalStyles.headerSmall, styles.forgotPasswordText]}
            onPress={this.navigationToForgotPasswordPage}>
            {Translation.t('forgot_password')}
          </Text>
          <Button
            loading={this.state.isLoading}
            onPress={this.login}
            text={Translation.t('login')}
          />
          <Text style={[GlobalStyles.headerSmall, styles.bottomText]}>
            {Translation.t('no_account_yet') + ' '}
            <Text
              onPress={this.navigationToRegistryPage}
              style={styles.registerText}>
              {Translation.t('register_now') + '!'}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Modal title={'Błąd logowania'} ref={this.modal}>
        {this.renderModalContent()}
      </Modal>
    </MainBackgorund>
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
    paddingVertical: 35,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginBottom: 10,
    color: Colors.black,
  },
  bottomContainer: {
    marginTop: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
  },
  bottomText: {
    textAlign: 'center',
  },
  registerText: {
    color: Colors.primary,
  },
  inputStyle: {
    marginBottom: 10,
  },
  modalContent: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: Colors.primary,
    textAlign: 'center',
  },
});
