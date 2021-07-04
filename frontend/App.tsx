import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
//navigators
import MainNavigator from './app/pages/navigators/MainNavigator';
//services
import NavigationService from 'core/services/NavigationService';
import UserService from 'core/services/UserService';
import StorageService from 'core/services/StorageService';
//styles
import Colors from './app/styles/Colors';
//components
import Loader from 'components/Loader';

export default class App extends React.Component {
  state = {
    initialRouteName: 'init',
  };

  componentDidMount = async () => {
    const user = await UserService.getUserDataFromStorageOnInit();
    const afterIntro = await StorageService.get(
      StorageService.Points.AFTERINTRO
    );
    let initialRouteName = 'LoginPage';
    if (!afterIntro) {
      initialRouteName = 'IntroPage';
    } else if (user.token) {
      initialRouteName = 'MainContainer';
    }
    this.setInitialPage(initialRouteName);
    SplashScreen.hide();
  };

  setInitialPage = (initialRouteName: string) => {
    this.setState({ initialRouteName });
  };

  render = () => {
    const MainContainer = createAppContainer(
      MainNavigator({ initialRouteName: this.state.initialRouteName })
    );
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={Colors.gray} barStyle={'dark-content'} />
        {this.state.initialRouteName !== 'init' && (
          <MainContainer
            ref={ref => {
              NavigationService.setMainTopLevelNavigator(ref);
            }}
          />
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.gray,
  },
});
