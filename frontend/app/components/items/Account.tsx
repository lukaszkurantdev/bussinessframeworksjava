import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
//components
import AccountIcon from './Icon';
//types
import { Account } from '../../core/models/Account.model';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
//utils
import { getAmountColor, amountToShow } from '../../core/utils/amount';

interface IProps {
  item: Account;
  index: number;
  onPress: () => void;
  withUserName?: boolean;
}

const AccountComponent = (props: IProps) => {
  console.log(props.item);
  return (
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
            type="account"
            size="small"
            color={props.item.color}
            icon={props.item.icon}
          />

          <View style={styles.textItemContainer}>
            {/* @ts-ignore */}
            <Text style={[GlobalStyles.accountHeader]}>
              {props.item.name}{' '}
              {props.withUserName ? `(user: ${props.item?.user?.username})` : ''}{' '}
            </Text>
            <Text style={[GlobalStyles.headerSmall, styles.itemTextSeparate]}>
              {amountToShow(props.item.balance)} {props.item.currency}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.typeIndicator,
            { backgroundColor: getAmountColor(props.item.balance) },
          ]}
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default AccountComponent;

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
    marginTop: 5,
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
  insideItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
