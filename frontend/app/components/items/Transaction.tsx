import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
//components
import AccountIcon from './Icon';
//types
import { Transaction } from '../../core/models/Transaction.model';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
//utils
import { getAmountColor, amountToShow } from '../../core/utils/amount';

interface IProps {
  item: Transaction;
  index: number;
  onPress: () => void;
}

const TransactionComponent = (props: IProps) => (
  <Animatable.View
    style={styles.itemContainer}
    animation="fadeIn"
    duration={500}
    delay={100 * props.index + 200}
    useNativeDriver>
    <TouchableOpacity
      style={styles.item}
      onPress={props.onPress}
      activeOpacity={0.7}>
      <View style={styles.insideItemContainer}>
        <AccountIcon
          type={props.item.type === 'expence' ? 'category' : 'account'}
          size="small"
          color={
            props.item.type === 'expence'
              ? props.item.category?.color
              : props.item.account?.color
          }
          icon={
            props.item.type === 'expence'
              ? props.item.category?.icon
              : props.item.account?.icon
          }
        />
        <View style={styles.textItemContainer}>
          <Text style={[GlobalStyles.textContentSmallSecondary]}>
            {props.item.type === 'expence'
              ? props.item.category?.name
              : props.item.account?.name}
          </Text>
          <Text style={[GlobalStyles.accountHeader, styles.itemTextSeparate]}>
            {props.item.type === 'expence'
              ? props.item.account?.name
              : props.item.type === 'income'
              ? props.item.category?.name
              : props.item.accountTo?.name}
          </Text>
          <Text style={[GlobalStyles.textContentSmallSecondary]}>
            {moment(props.item.date?.substring(0, 19)).format(
              'DD.MM.YYYY HH:mm'
            )}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[GlobalStyles.headerSmall, styles.amountText]}>
          {amountToShow(props.item.value)}
        </Text>
        <View
          style={[
            styles.typeIndicator,
            { backgroundColor: getAmountColor(props.item.value) },
          ]}
        />
      </View>
    </TouchableOpacity>
  </Animatable.View>
);

export default TransactionComponent;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    marginVertical: 7,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  item: {
    height: 70,
    backgroundColor: Colors.itemGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  itemTextSeparate: {
    marginVertical: 3,
  },
  insideItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemContainer: {
    marginLeft: 10,
  },
  typeIndicator: {
    height: 55,
    width: 6,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  amountText: {
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
