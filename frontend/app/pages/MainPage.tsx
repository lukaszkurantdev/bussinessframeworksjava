import React, { createRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationContainerComponent,
} from 'react-navigation';
//components
import BottomNavigationBar from '../components/navigators/BottomNavigationBar';
import TopBar from '../components/navigators/TopBar';
//navigators
import UserNavigator, {
  RoutePages,
  RoutePage,
} from './navigators/UserNavigator';
//services
import NavigationService from '../core/services/NavigationService';
import Colors from 'styles/Colors';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  activePage: RoutePage;
}

export default class MainPage extends React.Component<Props, State> {
  topbar = createRef<TopBar>();

  state = {
    activePage: RoutePages.HomePage,
  };

  constructor(props: Props) {
    super(props);
  }

  setNavigator = (ref: NavigationContainerComponent) => {
    NavigationService.setTopLevelNavigator(ref);
  };

  handleNavigationStateChange = () => {
    const name = NavigationService.getCurrentRouteName();
    console.warn(name);
    if (this.state.activePage.id !== name) {
      this.setState({ activePage: RoutePages[name] });
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        {this.state.activePage.id !== 'HomePage' && (
          <TopBar
            ref={this.topbar}
            pageName={this.state.activePage.name}
            isBack={this.state.activePage.isBack}
          />
        )}
        <View style={styles.container}>
          <UserNavigator
            ref={this.setNavigator}
            onNavigationStateChange={this.handleNavigationStateChange}
          />
        </View>

        <View>
          <BottomNavigationBar
            activePage={this.state.activePage.id}
            badges={[0, 0, 0, 0]}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  helperBlock: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
