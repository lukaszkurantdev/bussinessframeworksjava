import {
  createAppContainer,
  NavigationContainerComponent,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//pages
import MainPage from '../MainPage';
import IntroPage from 'pages/IntroPage';
import PincodePage from 'pages/PincodePage';
import LoginPage from 'pages/LoginPage';
import RegistryPage from 'pages/RegistryPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import PrivacyPolicyPage from 'pages/PrivacyPolicyPage';
import TermAndConditionPage from 'pages/TermAndConditionPage';

const MainStack = ({ initialRouteName }: { initialRouteName: string }) =>
  createStackNavigator(
    {
      MainContainer: {
        screen: MainPage,
      },
      IntroPage: {
        screen: IntroPage,
      },
      LoginPage: {
        screen: LoginPage,
      },
      RegistryPage: {
        screen: RegistryPage,
      },
      PincodePage: {
        screen: PincodePage,
      },
      ForgotPasswordPage: {
        screen: ForgotPasswordPage,
      },
      ResetPasswordPage: {
        screen: ResetPasswordPage,
      },
      TermAndConditionPage: {
        screen: TermAndConditionPage,
      },
      PrivacyPolicyPage: {
        screen: PrivacyPolicyPage,
      },
    },
    {
      initialRouteName,
      headerMode: 'none',
    }
  );

export default MainStack;
