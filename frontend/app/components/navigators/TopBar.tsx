import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
//services
import NavigationService from '../../core/services/NavigationService';

interface Props {
  pageName: string;
  isBack?: boolean;
  onLeftButtonPress?: () => void;
  main?: boolean;
}

export default class TopBar extends React.PureComponent<Props> {
  defaultOnLeftButtonPress = () => {
    if (this.props.main) {
      NavigationService.goBackMain();
    } else {
      NavigationService.goBack();
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            this.props.onLeftButtonPress || this.defaultOnLeftButtonPress
          }
          disabled={!this.props.isBack}>
          {this.props.isBack && (
            <Icon
              name="ios-arrow-round-back"
              size={30}
              color={Colors.primary}
            />
          )}
          <Text
            style={[
              GlobalStyles.headerSmall,
              this.props.isBack && styles.header,
            ]}>
            {this.props.pageName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginLeft: 20,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
});
