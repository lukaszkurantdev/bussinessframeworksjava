import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
//styles
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';

interface IProps {
  text: string;
  buttonText: string;
  onPressButton?: () => void;
}

const EmptyListContainer = (props: IProps) => (
  <View style={styles.mainContainer}>
    <Icon name="ios-heart-dislike" size={100} color={Colors.primary} />
    <Text style={[GlobalStyles.accountHeader, styles.emptyText]}>
      {TranslationService.t('its_empty')}
    </Text>
    <Text style={[GlobalStyles.headerSmall, styles.emptyText2]}>
      {props.text}
    </Text>
    <Button
      type="Tertiary"
      text={props.buttonText}
      onPress={props.onPressButton}
    />
  </View>
);

export default EmptyListContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    marginBottom: 10,
  },
  emptyText2: {
    marginBottom: 40,
    textAlign: 'center',
  },
});
