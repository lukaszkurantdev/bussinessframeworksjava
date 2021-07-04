import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';

interface Props {
  title: string;
  style?: Object;
}

export default class ModalClass extends React.Component<Props> {
  state = {
    isModalVisible: false,
  };

  locker: boolean = false;

  /**
   * Changes visibility state of modal.
   */
  toggleModal = () => {
    if (!this.locker) {
      this.locker = true;
      this.setState({ isModalVisible: !this.state.isModalVisible });
      setTimeout(() => {
        this.locker = false;
      }, 600);
    }
  };

  render = () => {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT'
          );

    return (
      <Modal
        isVisible={this.state.isModalVisible}
        backdropColor={Colors.black}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        onBackdropPress={this.toggleModal}
        style={[styles.container, this.props.style]}
        propagateSwipe={true}>
        <View style={[styles.bottomModal, this.props.style]}>
          <View style={styles.row}>
            <Text style={GlobalStyles.headerSmall}>{this.props.title}</Text>
            <TouchableOpacity
              onPress={this.toggleModal}
              hitSlop={{ bottom: 15, top: 15, left: 15, right: 15 }}>
              <Icon name="ios-close" color={Colors.graySecondary} size={35} />
            </TouchableOpacity>
          </View>
          {this.props.children}
        </View>
      </Modal>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModal: {
    backgroundColor: Colors.gray,
    paddingVertical: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
