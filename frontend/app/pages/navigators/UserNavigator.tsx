import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//pages
import HomePage from '../HomePage';
import CategoriesPage from '../CategoriesPage';
import AddCategoryPage from '../AddCategoryPage';
import AddAccountPage from '../AddAccountPage';
import AddTransactionPage from '../AddTransactionPage';
import TransactionsPage from '../TransactionsPage';
import StatisticsPage from '../StatisticsPage';
import MenuPage from 'pages/MenuPage';
import SettingsPage from 'pages/SettingsPage';
import ChangePasswordPage from 'pages/ChangePasswordPage';
import ReceiptsListPage from 'pages/ReceiptsListPage';
import ReceiptAddPage from 'pages/ReceiptAddPage';
import ReceiptDetailsPage from 'pages/ReceiptDetailsPage';
import ExchangeRatesPage from 'pages/ExchangeRatesPage';
//services
import TranslationService from '../../core/services/TranslationService';
import AllAccountsPage from 'pages/AllAccountsPage';

export interface RoutePage {
  id: string;
  name: string;
  isBack: boolean;
}

export const RoutePages: { [name: string]: RoutePage } = {
  HomePage: {
    id: 'HomePage',
    name: 'HomePage',
    isBack: false,
  },
  CategoriesPage: {
    id: 'CategoriesPage',
    name: TranslationService.t('categories'),
    isBack: true,
  },
  AddCategoryPage: {
    id: 'AddCategoryPage',
    name: TranslationService.t('add_category'),
    isBack: true,
  },
  AddAccountPage: {
    id: 'AddAccountPage',
    name: TranslationService.t('add_account'),
    isBack: true,
  },
  AddTransactionPage: {
    id: 'AddTransactionPage',
    name: TranslationService.t('add_transaction'),
    isBack: true,
  },
  TransactionsPage: {
    id: 'TransactionsPage',
    name: TranslationService.t('transactions'),
    isBack: false,
  },
  StatisticsPage: {
    id: 'StatisticsPage',
    name: TranslationService.t('statistics'),
    isBack: false,
  },
  MenuPage: {
    id: 'MenuPage',
    name: TranslationService.t('menu'),
    isBack: false,
  },
  SettingsPage: {
    id: 'SettingsPage',
    name: TranslationService.t('settings'),
    isBack: true,
  },
  ChangePasswordPage: {
    id: 'ChangePasswordPage',
    name: TranslationService.t('changeing_pasword'),
    isBack: true,
  },
  ReceiptsListPage: {
    id: 'ReceiptsListPage',
    name: TranslationService.t('receipt'),
    isBack: true,
  },
  ReceiptAddPage: {
    id: 'ReceiptAddPage',
    name: TranslationService.t('receipt_add'),
    isBack: true,
  },
  ReceiptDetailsPage: {
    id: 'ReceiptDetailsPage',
    name: TranslationService.t('receipt'),
    isBack: true,
  },
  ExchangeRatesPage: {
    id: 'ExchangeRatesPage',
    name: TranslationService.t('courses'),
    isBack: true,
  },
  AllAccountsPage: {
    id: 'AllAccountsPage',
    name: 'All Users Accounts',
    isBack: false,
  },
};

const ClientStackNavigator = createStackNavigator(
  {
    HomePage,
    CategoriesPage,
    AddCategoryPage,
    AddAccountPage,
    AddTransactionPage,
    TransactionsPage,
    StatisticsPage,
    MenuPage,
    SettingsPage,
    ChangePasswordPage,
    ReceiptsListPage,
    ReceiptAddPage,
    ReceiptDetailsPage,
    ExchangeRatesPage,
    AllAccountsPage,
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
  }
);

export default createAppContainer(ClientStackNavigator);
