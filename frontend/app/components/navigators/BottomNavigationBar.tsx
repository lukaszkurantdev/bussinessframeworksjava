import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
//components
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import Colors from '../../styles/Colors';
import NavigationService from '../../core/services/NavigationService';
import UserService from 'core/services/UserService';

let ClientIcons = [
  {
    page: 'HomePage',
    icon: 'ios-apps',
  },
  {
    page: 'TransactionsPage',
    icon: 'ios-cash',
  },
  {
    page: 'AddTransactionPage',
    icon: 'ios-add',
  },
  {
    page: 'CategoriesPage',
    icon: 'ios-basket',
  },
  {
    page: 'MenuPage',
    icon: 'ios-keypad',
  },
];

interface Props {
  activePage: string;
  badges: number[];
}

export default class BottomNavigationBar extends React.PureComponent<Props> {
  render = () => {
    const userData = UserService.getUserData();

    if (userData.roles?.find(v => v.name === 'ROLE_ADMIN')) {
      ClientIcons[3] = {
        page: 'AllAccountsPage',
        icon: 'ios-apps',
      };
    }

    return (
      <View style={styles.container}>
        {ClientIcons.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.icon}
            activeOpacity={0.6}
            onPress={() => NavigationService.navigate(value.page)}>
            {index !== 2 && (
              <View style={styles.iconContainer}>
                <View style={styles.iconSvgContainer}>
                  <Icon
                    name={value.icon}
                    color={
                      this.props.activePage === value.page
                        ? Colors.primary
                        : Colors.grayLight
                    }
                    size={25}
                  />
                </View>
                <View style={styles.iconDotContainer}>
                  {this.props.activePage === value.page && (
                    <View style={styles.iconDot} />
                  )}
                </View>
              </View>
            )}

            {index === 2 && (
              <View style={styles.centerIconContainer}>
                <View style={styles.centerButton}>
                  <Icon name={'ios-add'} color={Colors.white} size={30} />
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    elevation: 30,
  },
  icon: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
  },
  iconContainer: {
    marginTop: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSvgContainer: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDotContainer: {
    marginTop: 4,
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  iconDotCenterContainer: {
    height: 5,
    width: 5,
    borderRadius: 5,
    // marginTop: 10
  },
  centerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 35,
    height: 35,
    backgroundColor: Colors.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
});
