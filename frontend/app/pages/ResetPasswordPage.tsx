import React, { createRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//components
import Button from 'components/Button';
import Input from 'components/Input';
import MainBackgorund from 'components/MainBackground';
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
  isLoading: boolean;
  message: string;
}

export default class ResetPasswordPage extends React.Component<{}, IState> {
  state: IState = {
    isLoading: false,
    message: '',
  };

  codeInput = createRef<Input>();
  passwordInput = createRef<Input>();
  confirmInput = createRef<Input>();
  modal = createRef<Modal>();

  toggleModal = (message: string = '') => {
    let modal = this.modal.current;
    this.setState({ message }, () => {
      if (modal) {
        modal.toggleModal();
      }
    });
  };

  apiRequest = async () => {
    if (this.validateInputs()) {
      this.navigateToLoginPage();
      // this.setState({ isLoading: true });
      // let code = this.getCode();
      // let password = this.getPassword();
      // let data = {
      //   code,
      //   password,
      // };
      // let body: AxiosRequestConfig = {
      //   url: ApiService.Points.RESETPASSWORD,
      //   method: 'POST',
      //   data,
      // };
      // try {
      //   await ApiService.request(body);
      //   this.navigateToLoginPage();
      // } catch (error) {
      //   this.setState({ isLoading: false });
      //   console.log('err', error);
      //   this.toggleModal(Translation.t('incorrect_login_data'));
      // }
    }
  };

  navigateToLoginPage = () => {
    NavigationService.resetMainStackThenNavigate('LoginPage');
  };

  validateCodeInput = (): boolean => {
    const input = this.codeInput.current;
    if (input) {
      return input.validate();
    }
    return false;
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
    let code = this.validateCodeInput();
    let password = this.validatePassword();
    let reply = this.validateReplyPassword();
    return code && password && reply && this.isPasswordCorrect();
  };

  validatePassword = (): boolean => {
    const input = this.passwordInput.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  validateReplyPassword = (): boolean => {
    const input = this.confirmInput.current;
    if (input) {
      return input.validate();
    }
    return false;
  };

  getPassword = (): string => {
    const input = this.passwordInput.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  getReplyPassword = (): string => {
    const input = this.confirmInput.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  getCode = (): string => {
    const input = this.codeInput.current;
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
      <TopBar isBack main pageName={Translation.t('reset_password2')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.topContainer}>
          <SvgSmallLogo />
          <Text style={[GlobalStyles.headerBig, styles.headerText]}>
            {Translation.t('reset_password')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input ref={this.codeInput} placeholder={Translation.t('code')} />
          <Input
            ref={this.passwordInput}
            isValueHidden
            placeholder={Translation.t('password')}
          />
          <Input
            isValueHidden
            placeholder={Translation.t('reply_password')}
            ref={this.confirmInput}
          />
          <Button
            loading={this.state.isLoading}
            onPress={this.apiRequest}
            text={Translation.t('retriev')}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal title={'Błąd odzyskiwania'} ref={this.modal}>
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
  headerSmall: {
    textAlign: 'center',
  },
});
