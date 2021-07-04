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
import ApiService, { AxiosRequestConfig } from 'core/services/ApiService';
//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';

interface IState {
  isLoading: boolean;
  message: string;
  correct: boolean;
}

export default class ChangePasswordPage extends React.Component<{}, IState> {
  state: IState = {
    isLoading: false,
    message: '',
    correct: false,
  };

  oldPasswordInput = createRef<Input>();
  passwordInput = createRef<Input>();
  confirmInput = createRef<Input>();
  modal = createRef<Modal>();

  toggleModal = (message: string = '', correct: boolean = false) => {
    let modal = this.modal.current;
    this.setState({ message, correct }, () => {
      if (modal) {
        modal.toggleModal();
      }
    });
  };

  apiRequest = async () => {
    if (this.validateInputs()) {
      this.setState({ isLoading: true });
      const old_password = this.getOldPasswordInput();
      const new_password = this.getPassword();
      const data = {
        old_password,
        new_password,
      };
      const body: AxiosRequestConfig = {
        url: ApiService.Points.CHANGE_PASSWORD,
        method: 'POST',
        data,
      };
      try {
        const respones = await ApiService.request(body);
        if (respones.data.old_password === 'Invalid old password.') {
          this.toggleModal(Translation.t('old_password_incorrect'));
        } else {
          this.toggleModal(Translation.t('change_password_correct'), true);
        }
      } catch (error) {
        this.toggleModal(Translation.t('unexpected_error'));
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  validateOldPasswordInput = (): boolean => {
    const input = this.oldPasswordInput.current;
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
    let code = this.validateOldPasswordInput();
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

  getOldPasswordInput = (): string => {
    const input = this.oldPasswordInput.current;
    if (input) {
      return input.handleGetValue();
    }
    return '';
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text
        style={[
          GlobalStyles.headerMedium,
          styles.messageText,
          this.state.correct && styles.greenText,
        ]}>
        {this.state.message}
      </Text>
    </View>
  );

  render = () => (
    <MainBackgorund style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View>
          <Input
            ref={this.oldPasswordInput}
            isValueHidden
            placeholder={Translation.t('old_password')}
          />
          <Input
            ref={this.passwordInput}
            isValueHidden
            placeholder={Translation.t('new_password')}
          />
          <Input
            isValueHidden
            placeholder={Translation.t('confirm_new_password')}
            ref={this.confirmInput}
          />
          <Button
            loading={this.state.isLoading}
            style={styles.button}
            onPress={this.apiRequest}
            text={Translation.t('change_password')}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal title={Translation.t('changeing_pasword')} ref={this.modal}>
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
  greenText: {
    color: Colors.green,
  },
  headerSmall: {
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});
