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

export default class ForgotPasswordPage extends React.Component<{}, IState> {
  state: IState = {
    isLoading: false,
    message: '',
  };

  emailInput = createRef<Input>();
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
    if (this.validateEmail()) {
      this.navigationToResetPasswordPage();
      // this.setState({ isLoading: true });
      // let email = this.getEmail();
      // let data = {
      //   email,
      // };
      // let body: AxiosRequestConfig = {
      //   url: ApiService.Points.FORGOTPASSWORD,
      //   method: 'POST',
      //   data,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // };
      // try {
      //   await ApiService.request(body);
      //   this.navigationToResetPasswordPage();
      // } catch (error) {
      //   this.setState({ isLoading: false });
      //   console.log('err', error);
      //   this.toggleModal(Translation.t('incorrect_login_data'));
      // }
    }
  };

  navigationToResetPasswordPage = (): void => {
    NavigationService.mainNavigate('ResetPasswordPage');
  };

  validateEmail = (): boolean => {
    const input = this.emailInput.current;
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

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={[GlobalStyles.headerMedium, styles.messageText]}>
        {this.state.message}
      </Text>
    </View>
  );

  render = () => (
    <MainBackgorund style={styles.mainContainer}>
      <TopBar isBack main pageName={Translation.t('retriev2')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.topContainer}>
          <SvgSmallLogo />
          <Text style={[GlobalStyles.headerBig, styles.headerText]}>
            {Translation.t('retriev_password')}
          </Text>
          <Text style={[GlobalStyles.headerSmall, styles.headerSmall]}>
            {Translation.t('retriev_password_description')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Input ref={this.emailInput} placeholder={Translation.t('email')} />
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
