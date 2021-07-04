import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
//components
import Loader from '../components/Loader';
import MainBackground from '../components/MainBackground';
import Button from '../components/Button';
import Modal from '../components/Modal';
import EmptyListContainer from '../components/EmptyListContainer';
import AccountPicker from 'components/pickers/AccountPicker';
import CategoryPicker from 'components/pickers/CategoryPicker';
import DatePicker from 'components/pickers/DatePicker';
import TransactionComponent from 'components/items/Transaction';
//models
import { Transaction } from '../core/models/Transaction.model';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';
import { AxiosRequestConfig } from 'axios';
import ApiService from 'core/services/ApiService';
import { Account } from 'core/models/Account.model';
import { Category } from 'core/models/Category.model';
import NavigationService from 'core/services/NavigationService';

interface IState {
  loading: boolean;
  refreshing: boolean;
  data: Transaction[];
  date: string;
  isFiltering: boolean;
  modalTransaction: Transaction | null;
  startDate: string;
  endDate: string;
  accounts: Account[];
  categories: Category[];
  filterCategoryId: number | null;
  filterAccountId: number | null;
}

interface IFilterParms {
  start_date?: string;
  end_date?: string;
  account?: number;
  category?: number;
}

export default class TransactionsPage extends React.Component<{}, IState> {
  removeAccountModal = React.createRef<Modal>();
  showDetailsModal = React.createRef<Modal>();
  filtersModal = React.createRef<Modal>();

  dateFromPickerRef = React.createRef<DatePicker>();
  dateToPickerRef = React.createRef<DatePicker>();
  accountPickerRef = React.createRef<AccountPicker>();
  categoryPickerRef = React.createRef<CategoryPicker>();

  state: IState = {
    loading: true,
    refreshing: false,
    data: [],
    date: moment().format('YYYY-MM-01'),
    isFiltering: false,
    modalTransaction: null,
    startDate: '',
    endDate: '',
    filterCategoryId: null,
    filterAccountId: null,
    accounts: [],
    categories: [],
  };

  constructor(props: any) {
    super(props);
    moment.locale('pl');
  }

  componentDidMount = () => {
    this.setDefaultDates();
    this.getAccounts();
    this.getCategories();
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

  setFilters = () => {
    const accountPickerRef = this.accountPickerRef.current;
    const categoryPickerRef = this.categoryPickerRef.current;
    const dateFromPickerRef = this.dateFromPickerRef.current;
    const dateToPickerRef = this.dateToPickerRef.current;

    if (
      accountPickerRef &&
      categoryPickerRef &&
      dateFromPickerRef &&
      dateToPickerRef
    ) {
      const account = accountPickerRef.getValue();
      const category = categoryPickerRef.getValue();
      const dateFrom = dateFromPickerRef.getValue();
      const dateTo = dateToPickerRef.getValue();

      let stateToSave: any = {};
      if (account) {
        stateToSave.filterAccountId = account.id;
      }

      if (category) {
        stateToSave.filterCategoryId = category.id;
      }

      if (dateFrom) {
        stateToSave.startDate = moment(dateFrom).format('YYYY-MM-DD');
      }

      if (dateTo) {
        stateToSave.endDate = moment(dateTo).format('YYYY-MM-DD');
      }

      console.log(stateToSave);

      this.setState({ ...stateToSave, isFiltering: true }, () => {
        this.getData();
        this.toggleFiltersModal();
      });
    }
  };

  resetFilters = () => {
    this.setState(
      { isFiltering: false, filterCategoryId: null, filterAccountId: null },
      () => {
        this.setDefaultDates();
        this.toggleFiltersModal();
      }
    );
  };

  getAccounts = async () => {
    let body: AxiosRequestConfig = {
      url: ApiService.Points.ACCOUNTS,
      method: 'GET',
    };

    try {
      const request = await ApiService.request(body);
      console.log(request.data);

      this.setState({
        accounts: request.data,
      });
    } catch {}
  };

  getCategories = async () => {
    let body: AxiosRequestConfig = {
      url: ApiService.Points.CATEGORIES,
      method: 'GET',
    };

    try {
      const request = await ApiService.request(body);
      console.log(request.data);

      let categories: Category[] = [];

      request.data.forEach((category: Category) => {
        categories.push(category);
        category.subcategories?.forEach((subCategory: Category) => {
          categories.push(subCategory);
        });
      });

      this.setState({ categories });
    } catch {}
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getData();
    });
  };

  getData = async () => {
    const {
      startDate,
      endDate,
      filterCategoryId,
      filterAccountId,
    } = this.state;
    console.log(startDate, endDate, filterCategoryId, filterAccountId);
    let params: any = {};

    if (startDate) {
      params.startDate = startDate;
    }

    if (endDate) {
      params.endDate = endDate;
    }

    if (filterCategoryId) {
      params.category = filterCategoryId;
    }

    if (filterAccountId) {
      params.account = filterAccountId;
    }

    let body: AxiosRequestConfig = {
      url: ApiService.Points.TRANSACTIONS,
      method: 'GET',
      params,
    };

    try {
      const request = await ApiService.request(body);
      // console.logconsole.log(request.data);

      this.setState({
        data: request.data,
        loading: false,
        refreshing: false,
      });
    } catch {}
  };

  removeTransaction = async () => {
    let body: AxiosRequestConfig = {
      url: ApiService.Points.TRANSACTIONS,
      method: 'DELETE',
      data: {
        id: this.state.modalTransaction?.id
      }
    };


    try {
      const request = await ApiService.request(body);
      console.log(request);
      let data = this.state.data.filter(
        v => v.id !== this.state.modalTransaction?.id
      );

      this.setState({
        data,
        loading: false,
        refreshing: false,
      });
      this.toggleShowModal();
      this.toggleRemoveModal();
    } catch (error) {
      // console.log(error);
    }
  };

  editTransaction = () => {
    NavigationService.navigate('AddTransactionPage', {
      mode: 'edit',
      transaction: this.state.modalTransaction,
      refresh: this.onRefresh,
    });

    this.toggleShowModal();
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

  toggleRemoveModal = () => {
    const removeAccountModal = this.removeAccountModal.current;
    if (removeAccountModal) {
      removeAccountModal.toggleModal();
    }
  };

  toggleShowModal = (transaction: Transaction | null = null) => {
    this.setState({ modalTransaction: transaction });
    const showDetailsModal = this.showDetailsModal.current;
    if (showDetailsModal) {
      showDetailsModal.toggleModal();
    }
  };

  toggleFiltersModal = (isClose = true) => {
    const filtersModal = this.filtersModal.current;
    if (filtersModal) {
      filtersModal.toggleModal();

      if (this.state.isFiltering && !isClose) {
        setTimeout(() => {
          const accountPickerRef = this.accountPickerRef.current;
          const categoryPickerRef = this.categoryPickerRef.current;
          const dateFromPickerRef = this.dateFromPickerRef.current;
          const dateToPickerRef = this.dateToPickerRef.current;
          console.log(
            'test',
            accountPickerRef &&
              categoryPickerRef &&
              dateFromPickerRef &&
              dateToPickerRef
          );
          if (
            accountPickerRef &&
            categoryPickerRef &&
            dateFromPickerRef &&
            dateToPickerRef
          ) {
            console.log(this.state.filterAccountId);
            if (this.state.filterAccountId) {
              accountPickerRef.setValue(this.state.filterAccountId);
            }
            if (this.state.filterCategoryId) {
              categoryPickerRef.setValue(this.state.filterCategoryId);
            }
            dateFromPickerRef.setValue(moment(this.state.startDate).toDate());
            dateToPickerRef.setValue(moment(this.state.endDate).toDate());
          }
        }, 200);
      }
    }
  };

  addTransaction = () => {
    NavigationService.navigate('AddTransactionPage', {
      refresh: this.onRefresh,
    });
  };

  renderItem = ({ item, index }: { item: any; index: number }) => (
    <TransactionComponent
      item={item}
      index={index}
      onPress={() => this.toggleShowModal(item)}
    />
  );

  renderFilterButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.toggleFiltersModal(false)}
        style={[
          styles.filteringButton,
          {
            backgroundColor: this.state.isFiltering
              ? Colors.primary
              : Colors.white,
          },
        ]}>
        <Icon
          name="ios-funnel"
          size={20}
          color={this.state.isFiltering ? Colors.white : Colors.primary}
        />
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <MainBackground>
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <ScrollView
              contentContainerStyle={styles.grow}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }>
              {this.state.isFiltering ? (
                <View style={styles.accountsContainer}>
                  <View></View>
                  <Text style={[GlobalStyles.headerSmall]}>
                    {TranslationService.t('own_filters')}
                  </Text>
                  <View></View>
                </View>
              ) : (
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
              )}
              {this.state.data.length === 0 ? (
                <EmptyListContainer
                  text={TranslationService.t('add_transaction_to_continue')}
                  buttonText={TranslationService.t('add_transaction')}
                  onPressButton={this.addTransaction}
                />
              ) : (
                <FlatList
                  extraData={this.state.refreshing}
                  data={this.state.data}
                  renderItem={this.renderItem}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => '' + index}
                />
              )}
            </ScrollView>
            {/* {this.renderFilterButton()} */}
          </>
        )}
        <Modal
          ref={this.showDetailsModal}
          title={TranslationService.t('transaction')}>
      
          <Button
            text={TranslationService.t('remove')}
            type="Secondary"
            onPress={this.toggleRemoveModal}
          />
        </Modal>

        <Modal
          ref={this.removeAccountModal}
          title={TranslationService.t('remove_transaction')}>
          <Text style={[GlobalStyles.accountHeader, styles.removeText]}>
            {TranslationService.t('verify_remove_transaction_1')}
            <Text style={styles.colorSecondary}>
              {TranslationService.t('verify_remove_transaction_2')}
            </Text>
            {TranslationService.t('verify_remove_transaction_3')}
          </Text>
          <Button
            text={TranslationService.t('remove')}
            type="Secondary"
            onPress={this.removeTransaction}
          />
        </Modal>

        <Modal ref={this.filtersModal} title={TranslationService.t('filters')}>
          <DatePicker
            ref={this.dateFromPickerRef}
            placeholder={TranslationService.t('date_from')}
          />
          <DatePicker
            ref={this.dateToPickerRef}
            placeholder={TranslationService.t('date_to')}
          />

          <AccountPicker
            ref={this.accountPickerRef}
            accounts={this.state.accounts}
            placeholder={TranslationService.t('account').toLowerCase()}
          />
          <CategoryPicker
            ref={this.categoryPickerRef}
            categories={this.state.categories}
            placeholder={TranslationService.t('category').toLowerCase()}
          />

          <Button
            text={TranslationService.t('save_filters')}
            type="Secondary"
            containerStyle={styles.firstButton}
            onPress={this.setFilters}
          />
          <Button
            text={TranslationService.t('reset_filters')}
            type="Tertiary"
            onPress={this.resetFilters}
          />
        </Modal>
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
  swipeableButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
  },
  accountsContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
    height: 50,
  },
  firstButton: {
    paddingBottom: 0,
  },
  amountText: {
    marginRight: 15,
  },
  filteringButton: {
    height: 50,
    width: 50,
    backgroundColor: Colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    elevation: 20,
  },
  grow: {
    flexGrow: 1,
  },
});
