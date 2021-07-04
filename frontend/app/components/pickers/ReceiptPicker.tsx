import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropper, { Options } from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
//components
import ErrorMessage from 'components/pickers/components/ErrorMessage';
//styles
import Colors from 'styles/Colors';
//service
import Translation from 'core/services/TranslationService';
import { View } from 'react-native-animatable';

interface IState {
  image: string;
  error: string;
}

interface IReceipt {
  path: string;
  base64: string;
}

interface IProps {}

export default class ReceiptPicker extends React.Component<IProps, IState> {
  state = {
    image: '',
    error: '',
  };

  pickPhoto = async () => {
    const options = {
      title: Translation.t('pickek'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      this.setState({ error: '' });
      if (response.didCancel) {
        return;
      }

      const source = response.uri;
      const cropperOptions: Options = {
        writeTempFile: false,
        path: source,
        width: 1024,
        height: 1024,
      };

      ImageCropper.openCropper(cropperOptions).then(async img => {
        this.saveReceipt(img.path);
      });
    });
  };

  saveReceipt = (image: string) => {
    this.setState({ image });
  };

  getReceipt = (): string => {
    return this.state.image;
  };

  getReceiptBase = async (): Promise<string> => {
    if (this.getReceipt()) {
      return this.convertToBase64(this.getReceipt());
    } else {
      return '';
    }
  };

  getFullReceipt = async (): Promise<IReceipt | null> => {
    const path = this.getReceipt();
    if (path) {
      return {
        path,
        base64: await this.getReceiptBase(),
      };
    }
    return null;
  };

  convertToBase64 = async (path: string): Promise<string> => {
    return `data:image/jpeg;base64,${await RNFS.readFile(
      decodeURI(path),
      'base64'
    )}`;
  };

  renderPicker = () => (
    <TouchableOpacity
      onPress={this.pickPhoto}
      style={[styles.container, styles.border]}
    />
  );

  renderReceipt = () => (
    <TouchableOpacity onPress={this.pickPhoto}>
      <Image source={{ uri: this.state.image }} style={styles.container} />
    </TouchableOpacity>
  );

  validate = () => {
    if (this.state.image === '') {
      this.setState({ error: Translation.t('picker_error') });
    }
    return this.state.image !== '';
  };

  render = () => (
    <View style={styles.mainContainer}>
      {this.state.image ? this.renderReceipt() : this.renderPicker()}
      <ErrorMessage textStyle={styles.errorText} error={this.state.error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  border: {
    borderWidth: 5,
    borderColor: Colors.primary,
  },
  errorText: {
    marginLeft: 0,
  },
  mainContainer: {
    alignItems: 'center',
  },
});
