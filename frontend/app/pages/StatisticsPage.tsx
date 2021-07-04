import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
//components
import Loader from '../components/Loader';
import MainBackground from '../components/MainBackground';
import Button from '../components/Button';
import Modal from '../components/Modal';
import EmptyListContainer from '../components/EmptyListContainer';
import AccountIcon from '../components/items/Icon';
import AccountPicker from 'components/pickers/AccountPicker';
import CategoryPicker from 'components/pickers/CategoryPicker';
import DatePicker from 'components/pickers/DatePicker';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';
//utils
import { getAmountColor, amountToShow } from '../core/utils/amount';
import NavigationService from 'core/services/NavigationService';
import { Currencies } from 'core/models/Currency.model';
import { Statistic } from 'core/models/Statistics.model';
import { AxiosRequestConfig } from 'axios';
import ApiService from 'core/services/ApiService';

interface IState {
  loading: boolean;
  expedintures: Statistic[];
  incomes: Statistic[];
  date: string;
  startDate: string;
  endDate: string;
  refreshing: boolean;
  percents: {
    incomes: number;
    expedintures: number;
  };
}

export default class StatisticsPage extends React.Component<{}, IState> {
  removeAccountModal = React.createRef<Modal>();
  showDetailsModal = React.createRef<Modal>();
  filtersModal = React.createRef<Modal>();

  state: IState = {
    loading: false,
    expedintures: [],
    incomes: [],
    date: moment().format('YYYY-MM-01'),
    startDate: '',
    endDate: '',
    refreshing: false,
    percents: {
      incomes: 50,
      expedintures: 50,
    },
  };

  constructor(props: any) {
    super(props);
    moment.locale('pl');
  }

  componentDidMount = () => {
    this.setDefaultDates();
  };

  setDefaultDates = () => {
    const startDate = moment().format('YYYY-MM-01');
    const endDate = moment().format('YYYY-MM-') + moment().daysInMonth();
    this.setState(
      {
        startDate,
        endDate,
      },
      () => {
        this.getData();
      }
    );
  };

  changeMonth = (number: number) => {
    let { date } = this.state;
    const newDate = moment(date)
      .add(number, 'M')
      .format('YYYY-MM-01');

    this.setState({
      date: newDate,
    });

    const endDate =
      moment(newDate).format('YYYY-MM-') + moment(newDate).daysInMonth();
    this.setState({ refreshing: true, startDate: newDate, endDate }, () => {
      this.getData();
    });
  };

  getData = async () => {
    let params = {
      start_date: this.state.startDate,
      end_date: this.state.endDate,
    };

    console.log(params);

    let body_expedintures: AxiosRequestConfig = {
      url: ApiService.Points.STATS_EXPEDINTURES,
      method: 'GET',
      params,
    };

    let body_incomes: AxiosRequestConfig = {
      url: ApiService.Points.STATS_INCOMES,
      method: 'GET',
      params,
    };

    try {
      const requestExpedintures = await ApiService.request(body_expedintures);
      const requestIncomes = await ApiService.request(body_incomes);
      console.log(requestExpedintures.data);
      console.log(requestIncomes.data);

      let percentExpedintures = 0;
      let percentIncomes = 0;

      if (requestExpedintures.data.length !== 0) {
        requestExpedintures.data.forEach((value: Statistic) => {
          percentExpedintures += value.value;
        });
      }

      if (requestIncomes.data.length !== 0) {
        requestIncomes.data.forEach((value: Statistic) => {
          percentIncomes += value.value;
        });
      }

      if (percentExpedintures === 0 && percentIncomes === 0) {
        percentExpedintures = 50;
        percentIncomes = 50;
      } else {
        const sum = percentIncomes + percentExpedintures;
        percentIncomes = (percentIncomes / sum) * 100;
        percentExpedintures = (percentExpedintures / sum) * 100;
      }

      this.setState({
        expedintures: requestExpedintures.data,
        incomes: requestIncomes.data,
        loading: false,
        refreshing: false,
        percents: {
          expedintures: percentExpedintures,
          incomes: percentIncomes,
        },
      });
    } catch {}
  };

  toggleRemoveModal = () => {
    const removeAccountModal = this.removeAccountModal.current;
    if (removeAccountModal) {
      removeAccountModal.toggleModal();
    }
  };

  toggleShowModal = () => {
    const showDetailsModal = this.showDetailsModal.current;
    if (showDetailsModal) {
      showDetailsModal.toggleModal();
    }
  };

  toggleFiltersModal = () => {
    const filtersModal = this.filtersModal.current;
    if (filtersModal) {
      filtersModal.toggleModal();
    }
  };

  renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animatable.View
      style={styles.itemContainer}
      animation="fadeIn"
      duration={500}
      delay={100 * index + 200}
      useNativeDriver>
      <View style={styles.item}>
        <View style={styles.insideItemContainer}>
          <AccountIcon
            type={'category'}
            size="small"
            color={item.color}
            icon={item.icon}
          />
          <View style={styles.textItemContainer}>
            <Text style={[GlobalStyles.headerSmallRegular]}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.flexend}>
            <Text style={[GlobalStyles.headerSmall, styles.amountText]}>
              {amountToShow(item.value)}
            </Text>
            <Text
              style={[
                GlobalStyles.textContentSmallSecondary,
                styles.amountText,
              ]}>
              {item.percent} %
            </Text>
          </View>

          <View
            style={[
              styles.typeIndicator,
              { backgroundColor: getAmountColor(item.amount) },
            ]}
          />
        </View>
      </View>
    </Animatable.View>
  );

  render = () => {
    return (
      <MainBackground>
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.accountsContainer}>
                  <TouchableOpacity onPress={() => this.changeMonth(-1)}>
                    <Icon
                      name="ios-arrow-round-back"
                      size={25}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>

                  <Text style={[GlobalStyles.headerSmall]}>
                    {moment(this.state.date).format('MMMM YYYY')}
                  </Text>

                  <TouchableOpacity onPress={() => this.changeMonth(1)}>
                    <Icon
                      name="ios-arrow-round-forward"
                      size={25}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={[GlobalStyles.headerSmall, styles.saldoText]}>
                  {TranslationService.t('saldo')}
                </Text>
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressIncome,
                      { flex: this.state.percents.incomes },
                      this.state.percents.incomes === 100 &&
                        styles.roundedCorners,
                    ]}></View>
                  <View
                    style={[
                      styles.progressOutcome,
                      { flex: this.state.percents.expedintures },
                      this.state.percents.expedintures === 100 &&
                        styles.roundedCorners,
                    ]}></View>
                </View>
                <View style={styles.progressText}>
                  <View>
                    <Text style={GlobalStyles.textContentSmallSecondary}>
                      {TranslationService.t('incomes')}
                    </Text>
                    <Text style={GlobalStyles.headerSmall}>
                      {this.state.percents.incomes.toFixed(2)} %
                    </Text>
                  </View>
                  <View style={styles.flexend}>
                    <Text style={GlobalStyles.textContentSmallSecondary}>
                      {TranslationService.t('outcomes')}
                    </Text>
                    <Text style={GlobalStyles.headerSmall}>
                      {this.state.percents.expedintures.toFixed(2)} %
                    </Text>
                  </View>
                </View>

                <Text style={[GlobalStyles.headerSmall, styles.title]}>
                  {TranslationService.t('incomes_category')}
                </Text>

                <FlatList
                  data={this.state.incomes}
                  renderItem={this.renderItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => '' + index}
                />

                <Text style={[GlobalStyles.headerSmall, styles.title]}>
                  {TranslationService.t('outcomes_category')}
                </Text>

                <FlatList
                  data={this.state.expedintures}
                  renderItem={this.renderItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => '' + index}
                />
              </View>
            </ScrollView>
          </>
        )}
        <Modal
          ref={this.showDetailsModal}
          title={TranslationService.t('transaction')}>
          <Button
            text={TranslationService.t('edit')}
            type="Tertiary"
            containerStyle={styles.firstButton}
          />
          <Button text={TranslationService.t('remove')} type="Secondary" />
        </Modal>

        <Modal
          ref={this.removeAccountModal}
          title={TranslationService.t('remove_account')}>
          <Text style={[GlobalStyles.accountHeader, styles.removeText]}>
            {TranslationService.t('verify_remove_account_1')}
            <Text style={styles.colorSecondary}>
              {TranslationService.t('verify_remove_account_2')}
            </Text>
            {TranslationService.t('verify_remove_account_3')}
          </Text>
          <Button text={TranslationService.t('remove')} type="Secondary" />
        </Modal>

        <Modal ref={this.filtersModal} title={TranslationService.t('filters')}>
          <DatePicker placeholder={TranslationService.t('date_from')} />
          <DatePicker placeholder={TranslationService.t('date_to')} />

          <AccountPicker
            accounts={[]}
            placeholder={TranslationService.t('account').toLowerCase()}
          />
          <CategoryPicker
            categories={[]}
            placeholder={TranslationService.t('category').toLowerCase()}
          />

          <Button
            text={TranslationService.t('save_filters')}
            type="Secondary"
            containerStyle={styles.firstButton}
          />
          <Button
            text={TranslationService.t('reset_filters')}
            type="Tertiary"
          />
        </Modal>
      </MainBackground>
    );
  };
}

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
  removeText: {
    marginVertical: 20,
  },
  scrollContent: {
    padding: 20,
  },
  colorSecondary: {
    color: Colors.secondary,
  },
  swipeableButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
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
  accountsContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableContainer: {
    overflow: 'hidden',
    backgroundColor: Colors.itemSecondaryGray,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footerSeparator: {
    marginLeft: 10,
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
  amountText: {
    marginRight: 15,
  },
  title: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexend: {
    alignItems: 'flex-end',
  },
  saldoText: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
  },
  progressIncome: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.green,
    height: 30,
  },
  progressOutcome: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.primary,
    height: 30,
  },
  progressText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  roundedCorners: {
    borderRadius: 10,
  },
});
