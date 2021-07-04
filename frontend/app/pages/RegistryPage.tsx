import React, { createRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//components
import Button from 'components/Button';
import Input from 'components/Input';
import MainBackgorund from 'components/MainBackground';
import CheckBoxComponent from 'components/CheckBoxComponent';
import Modal from 'components/Modal';
import TopBar from 'components/navigators/TopBar';
//services
import Translation from 'core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import ApiService, { AxiosRequestConfig } from 'core/services/ApiService';

//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';
//svg
import { SvgSmallLogo } from 'assets/svg';

interface IState {
  message: string;
  isLoading: boolean;
}

export default class RegistryPage extends React.Component<{}, IState> {
  state: IState = {
    message: '',
    isLoading: false,
  };

  emailInput = createRef<Input>();
  passwordInput = createRef<Input>();
  passwordReplyInput = createRef<Input>();
  modal = createRef<Modal>();
  checkbox = createRef<CheckBoxComponent>();

  toggleModal = (message: string = '') => {
    let modal = this.modal.current;
    this.setState({ message }, () => {
      if (modal) {
        modal.toggleModal();
      }
    });
  };

  register = async () => {
    if (this.validateInputs()) {
      this.setState({ isLoading: true });
      let username = this.getEmail();
      let password = this.getPassword();
      let data = {
        username,
        password,
      };
      let body: AxiosRequestConfig = {
        url: ApiService.Points.REGISTER,
        method: 'post',
        data,
      };

      try {
        await ApiService.request(body);
        this.navigateToLoginPage();
      } catch (error) {
        console.log(error.response);
        this.setState({ isLoading: false });
        this.toggleModal(Translation.t('unexpected_error'));
        // if (
        //   error.response.data.email[0] ===
        //   'user with this email already exists.'
        // ) {
        //   this.toggleModal(Translation.t('user_already_exist') + '!');
        // } else {
        // }
      }
    }
  };

  navigateToLoginPage = () => {
    NavigationService.resetMainStackThenNavigate('LoginPage');
  };

  isPasswordCorrect = (): boolean => {
    if (this.getPassword() === this.getReplyPassword()) {
      return true;
    } else {
      this.toggleModal(Translation.t('compare_pass_error'));
      return false;
    }
  };

  validateInputs = (): boolean => {
    let email = this.validateEmail();
    let password = this.validatePassword();
    let reply = this.validateReplyPassword();
    return (
      email &&
      password &&
      reply &&
      this.isPasswordCorrect() &&
      this.validateChackbox()
    );
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

  validateChackbox = (): boolean => {
    const checkbox = this.checkbox.current;
    let isValidate = false;
    if (checkbox) {
      isValidate = checkbox.getState();
    }
    if (!isValidate) {
      this.toggleModal(Translation.t('reg_accept'));
    }
    return isValidate;
  };

  validateReplyPassword = (): boolean => {
    const input = this.passwordReplyInput.current;
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

  getReplyPassword = (): string => {
    const input = this.passwordReplyInput.current;
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

  navigateToTerms = () => {
    NavigationService.mainNavigate('TermAndConditionPage');
  };

  navigateToPrivacyPolicy = () => {
    NavigationService.mainNavigate('PrivacyPolicyPage');
  };

  render = () => (
    <MainBackgorund style={styles.mainContainer}>
      <TopBar isBack main pageName={Translation.t('registery')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.topContainer}>
          <SvgSmallLogo />
          <Text style={[GlobalStyles.headerBig, styles.header]}>
            {Translation.t('registery')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input
            ref={this.emailInput}
            placeholder={Translation.t('username')}
          />
          <Input
            ref={this.passwordInput}
            isValueHidden
            placeholder={Translation.t('password')}
          />
          <Input
            ref={this.passwordReplyInput}
            isValueHidden
            placeholder={Translation.t('reply_password')}
          />
          <View style={styles.checkboxContainer}>
            <CheckBoxComponent ref={this.checkbox} style={styles.checkbox} />
            <Text style={GlobalStyles.headerSmall}>
              {Translation.t('statement') + ' '}
              <Text
                onPress={this.navigateToTerms}
                style={[GlobalStyles.headerSmall, styles.registerText]}>
                {Translation.t('terms')}
              </Text>
              {' ' + Translation.t('and') + ' '}
              <Text
                onPress={this.navigateToPrivacyPolicy}
                style={[GlobalStyles.headerSmall, styles.registerText]}>
                {Translation.t('policy_privacy')}
              </Text>
              .
            </Text>
          </View>
          <Button
            loading={this.state.isLoading}
            onPress={this.register}
            text={Translation.t('register_now')}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal title={'Błąd rejestracji'} ref={this.modal}>
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
  header: {
    color: Colors.black,
  },
  checkboxContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
  },
  checkbox: {
    marginRight: 5,
  },
});
