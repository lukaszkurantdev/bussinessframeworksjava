import {
  NavigationActions,
  StackActions,
  NavigationContainerComponent,
} from 'react-navigation';

let _mainNavigator: any;
let _navigator: any;

// TO DO
// declare global {
//   type NavigationPage = 'WorkoutPage' | 'ExercisesPage' | 'NotificationsPage' | 'ProfilePage' | 'SettingsPage' | 'StatsPage' | 'WorkoutsPage'
// }

let goBack = (): void => {
  _navigator.dispatch(NavigationActions.back());
};

let goBackMain = (): void => {
  _mainNavigator.dispatch(NavigationActions.back());
};

let setTopLevelNavigator = (navigatorRef: any): void => {
  _navigator = navigatorRef;
};

let setMainTopLevelNavigator = (navigatorRef: any): void => {
  _mainNavigator = navigatorRef;
};

let navigate = (routeName: string, params: object = {}): void => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

let mainNavigate = (routeName: string, params: object = {}) => {
  _mainNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

let getCurrentRoute = (): any => {
  let route = _navigator;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
};

let getCurrentRouteName = (): string => {
  let route = getCurrentRoute();
  const routeName: string =
    route.state.nav.routes[route.state.nav.routes.length - 1].routeName;
  return routeName;
};

let resetStackThenNavigate = (routeName: string, params: object = {}): void => {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  );
};

let resetMainStackThenNavigate = (
  routeName: string,
  params: object = {}
): void => {
  _mainNavigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  );
};

let isUserNavigator = (): boolean => {
  return _navigator;
};

export default {
  navigate,
  setTopLevelNavigator,
  getCurrentRoute,
  resetStackThenNavigate,
  getCurrentRouteName,
  setMainTopLevelNavigator,
  mainNavigate,
  resetMainStackThenNavigate,
  goBack,
  goBackMain,
  isUserNavigator,
};
