import React from 'react';
import { View, StyleSheet } from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import Colors from 'styles/Colors';
import Fonts from 'styles/Fonts';
import TranslationService from 'core/services/TranslationService';
import StorageService from 'core/services/StorageService';

interface IProps {
  navigation: any;
}

export default class PincodePage extends React.Component<IProps> {
  state = {
    //enter lub choose
    type: this.props.navigation.getParam('type', 'enter'),
    //function with navigation or hide modal with Pincode panel
    onFinish: this.props.navigation.getParam('onFinish', () => {}),
    storedPin: '',
  };

  componentDidMount = async () => {
    const pin = await StorageService.get(StorageService.Points.PIN);
    this.setState({ storedPin: pin });
  };

  onFinishPin = (pinCode?: string) => {
    console.log('ended');
    if (this.state.type === 'enter') {
      this.state.onFinish && this.state.onFinish();
    } else if (this.state.type === 'choose') {
      pinCode && StorageService.set(StorageService.Points.PIN, pinCode);
      this.state.onFinish();
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        {/* <PINCode
          // touchIDTitle=""
          status={this.state.type}
          colorCircleButtons={Colors.gray}
          maxAttempts={999999}
          colorPassword={Colors.primary}
          numbersButtonOverlayColor={Colors.primary}
          stylePinCodeButtonNumber={Colors.primary}
          stylePinCodeColorTitle={Colors.black}
          subtitleChoose={TranslationService.t('subtitleChoose')}
          subtitleError={TranslationService.t('subtitleError')}
          textButtonLockedPage={TranslationService.t('textButtonLockedPage')}
          textCancelButtonTouchID={TranslationService.t(
            'textCancelButtonTouchID'
          )}
          textSubDescriptionLockedPage={TranslationService.t(
            'textSubDescriptionLockedPage'
          )}
          titleAttemptFailed={TranslationService.t('titleAttemptFailed')}
          titleChoose={TranslationService.t('titleChoose')}
          titleConfirm={TranslationService.t('titleConfirm')}
          titleConfirmFailed={TranslationService.t('titleConfirmFailed')}
          titleEnter={TranslationService.t('titleEnter')}
          stylePinCodeTextTitle={styles.titleText}
          stylePinCodeTextSubtitle={styles.titleText}
          stylePinCodeTextButtonCircle={styles.titleText}
          stylePinCodeDeleteButtonText={styles.titleText}
          finishProcess={this.onFinishPin}
          // storedPin={this.state.storedPin}
        /> */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: Fonts.regular,
  },
});
