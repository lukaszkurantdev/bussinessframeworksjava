import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
  RefreshControl,
  Platform,
} from 'react-native';
import AnimatedLinearGradient, {
  presetColors,
  //@ts-ignore
} from 'react-native-animated-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
//components
import Loader from 'components/Loader';
import MainBackground from 'components/MainBackground';
import Button from 'components/Button';
import Modal from 'components/Modal';
import EmptyListContainer from 'components/EmptyListContainer';
import AccountComponent from 'components/items/Account';
import AddItemFooter from 'components/items/AddItemFooter';
//models
import { Account } from 'core/models/Account.model';
//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';
//services
import TranslationService from 'core/services/TranslationService';
//utils
import { amountToShow } from 'core/utils/amount';
import NavigationService from 'core/services/NavigationService';
import ApiService from 'core/services/ApiService';
import { AxiosRequestConfig } from 'axios';

interface IState {
  loading: boolean;
  amount: string;
  currency: string;
  data: Account[];
  refreshing: boolean;
  modalAccount: Account | null;
}

export default class AllAccountsPage extends React.Component<{}, IState> {
  removeAccountModal = React.createRef<Modal>();
  showDetailsModal = React.createRef<Modal>();

  state: IState = {
    loading: true,
    amount: '0',
    data: [],
    currency: 'zł',
    refreshing: false,
    modalAccount: null,
  };

  componentDidMount = () => {
    this.getData();
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getData();
    });
  };

  getData = async () => {
    let body: AxiosRequestConfig = {
      url: ApiService.Points.ALL_ACCOUNTS,
      method: 'GET',
    };

    try {
      const request = await ApiService.request(body);
      console.log(request.data);

      this.setState({
        data: request.data,
        amount: amountToShow(
          request.data
            .map((v: Account) => v.balance)
            .reduce((v: number, w: number) => v + w, 0)
        ),
        loading: false,
        refreshing: false,
      });
    } catch (err) {
      console.log('err', err.response);
    }
  };

  renderItem = ({ item, index }: { item: any; index: number }) => (
    <AccountComponent onPress={() => null} item={item} index={index} withUserName/>
  );

  renderHeader = () =>
    Platform.OS === 'android' ? (
      <AnimatedLinearGradient
        customColors={presetColors.instagram}
        speed={8000}>
        {this.renderHeadContent()}
      </AnimatedLinearGradient>
    ) : (
      <LinearGradient colors={presetColors.instagram}>
        {this.renderHeadContent()}
      </LinearGradient>
    );

  renderHeadContent = () => (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.headerContainer}>
        <Text style={[GlobalStyles.headerSmall, styles.whiteText]}>
          {TranslationService.t('current_money_state')}
        </Text>
        <Text style={[GlobalStyles.headerBig]}>
          {this.state.amount} {this.state.currency}
        </Text>
      </View>
    </>
  );

  keyExtractor = (_item: any, index: number) => index.toString();

  render = () => {
    return (
      <MainBackground>
        {this.state.loading ? (
          <Loader />
        ) : this.state.data.length !== 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {this.renderHeader()}
            <View style={styles.container}>
              <View style={styles.accountsContainer}>
                <Text style={[GlobalStyles.headerSmall, styles.headerText]}>
                  Konta użytkowników
                </Text>
              </View>

              <FlatList
                extraData={this.state.refreshing}
                data={this.state.data}
                renderItem={this.renderItem}
                scrollEnabled={false}
                keyExtractor={this.keyExtractor}
              />
            </View>
          </ScrollView>
        ) : (
          <EmptyListContainer
            text={''}
            buttonText={TranslationService.t('add_account')}
            onPressButton={() => null}
          />
        )}
      </MainBackground>
    );
  };
}

const styles = StyleSheet.create({
  removeText: {
    marginVertical: 20,
  },
  scrollContent: {
    padding: 20,
  },
  colorSecondary: {
    color: Colors.primary,
  },
  accountsContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContainer: {
    padding: 20,
    paddingVertical: 100,
    paddingTop: 100,
    alignItems: 'center',
  },
  whiteText: {
    color: Colors.white,
  },
  container: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: Colors.gray,
    marginTop: -20,
    elevation: 30,
  },
  firstButton: {
    paddingBottom: 0,
  },
  headerText: {
    marginTop: 15,
  },
});
