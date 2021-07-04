import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//services
import TranslationService from 'core/services/TranslationService';
//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';

interface IProps {
  onPress: () => void;
  title: string;
}

const AddItemFooter = (props: IProps) => (
  <TouchableOpacity onPress={props.onPress} style={styles.footerContainer}>
    <Icon name="ios-add" color={Colors.primary} size={25} />

    <Text style={[GlobalStyles.headerSmall, styles.footerSeparator]}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

export default AddItemFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footerSeparator: {
    marginLeft: 10,
  },
});
