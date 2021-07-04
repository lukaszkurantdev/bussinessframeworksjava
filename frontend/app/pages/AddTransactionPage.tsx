import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//models
import { AxiosRequestConfig } from 'axios';
import { Account } from 'core/models/Account.model';
import { Category } from 'core/models/Category.model';
//components
import MainBackground from '../components/MainBackground';
import Button from '../components/Button';
import Input from '../components/Input';
import CategoryPicker from 'components/pickers/CategoryPicker';
import AccountPicker from 'components/pickers/AccountPicker';
import AmountPicker from 'components/pickers/AmountPicker';
import DatePicker from 'components/pickers/DatePicker';
import Loader from 'components/Loader';
import ErrorMessage from 'components/pickers/components/ErrorMessage';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import ApiService from 'core/services/ApiService';
import moment from 'moment';
import { Transaction } from 'core/models/Transaction.model';

interface IState {
  loading: boolean;
  selectedButton: number;
  accounts: Account[];
  categories: Category[];
  fetching: boolean;
  mode: string | null;
  transaction: Transaction;
  accountCurrencyError: boolean;
}

interface IProps {
  navigation: any;
}

interface TypeButtonData {
  id: number;
  icon: string;
  selectedColor: string;
  title: string;
}

const TypeButtons: TypeButtonData[] = [
  {
    id: 1,
    icon: 'ios-download',
    selectedColor: Colors.green,
    title: TranslationService.t('income'),
  },
  {
    id: 2,
    icon: 'ios-share',
    selectedColor: Colors.primary,
    title: TranslationService.t('outcome'),
  },
  {
    id: 3,
    icon: 'ios-shuffle',
    selectedColor: Colors.secondary,
    title: TranslationService.t('transfer'),
  },
];

export default class AddTransactionPage extends React.Component<
  IProps,
  IState
> {
  state: IState = {
    loading: false,
    selectedButton: 0,
    accounts: [],
    categories: [],
    fetching: false,
    mode: this.props.navigation.getParam('mode'),
    transaction: this.props.navigation.getParam('transaction'),
    accountCurrencyError: false,
  };

  descriptionInputRef = React.createRef<Input>();
  amountPickerRef = React.createRef<AmountPicker>();
  datePickerRef = React.createRef<DatePicker>();

  incomeCategoryPickerRef = React.createRef<CategoryPicker>();
  incomeAccountPickerRef = React.createRef<AccountPicker>();

  outcomeCategoryPickerRef = React.createRef<CategoryPicker>();
  outcomeAccountPickerRef = React.createRef<AccountPicker>();

  transferAccount1PickerRef = React.createRef<AccountPicker>();
  transferAccount2PickerRef = React.createRef<AccountPicker>();

  componentDidMount = async () => {
    await this.getAccounts();
    await this.getCategories();

    if (this.state.mode === 'edit' && this.state.transaction) {
      let buttonIndex = 0;
      switch (this.state.transaction.type) {
        case 'income':
          buttonIndex = 1;
          break;
        case 'expence':
          buttonIndex = 2;
          break;
        case 'transfer':
          buttonIndex = 3;
          break;
      }

      this.setState({ selectedButton: buttonIndex }, () => {
        this.setValues(this.state.transaction);
      });
    }
    this.setState({ loading: false });
  };

  setValues = (transaction: Transaction) => {
    const descriptionInputRef = this.descriptionInputRef.current;
    const amountPickerRef = this.amountPickerRef.current;
    const datePickerRef = this.datePickerRef.current;

    let sourceRef, destinationRef;

    switch (transaction.type) {
      case 'income':
        sourceRef = this.incomeCategoryPickerRef.current;
        destinationRef = this.incomeAccountPickerRef.current;
        break;
      case 'expence':
        sourceRef = this.outcomeAccountPickerRef.current;
        destinationRef = this.outcomeCategoryPickerRef.current;
        break;
      case 'transfer':
        sourceRef = this.transferAccount1PickerRef.current;
        destinationRef = this.transferAccount2PickerRef.current;
        break;
    }

    if (
      descriptionInputRef &&
      amountPickerRef &&
      sourceRef &&
      destinationRef &&
      datePickerRef
    ) {
      amountPickerRef.setValue(transaction.value);
      descriptionInputRef.handleChange(transaction.description);
      datePickerRef.setValue(moment(transaction.date).toDate());
      // sourceRef.setValue(transaction.source.id);
      // destinationRef.setValue(transaction.other.id);
    }
  };

  onSubmit = async () => {
    this.setState({ fetching: true, accountCurrencyError: false });
    const { selectedButton } = this.state;

    const descriptionInputRef = this.descriptionInputRef.current;
    const amountPickerRef = this.amountPickerRef.current;
    const datePickerRef = this.datePickerRef.current;

    let sourceRef, destinationRef;

    let link = '';

    switch (selectedButton) {
      case 1:
        sourceRef = this.incomeCategoryPickerRef.current;
        destinationRef = this.incomeAccountPickerRef.current;
        link += 'income';
        break;
      case 2:
        sourceRef = this.outcomeAccountPickerRef.current;
        destinationRef = this.outcomeCategoryPickerRef.current;
        link += 'expence';
        break;
      case 3:
        sourceRef = this.transferAccount1PickerRef.current;
        destinationRef = this.transferAccount2PickerRef.current;
        link += 'transfer';
        break;
    }

    if (
      descriptionInputRef &&
      amountPickerRef &&
      sourceRef &&
      destinationRef &&
      datePickerRef
    ) {
      const validations = [
        amountPickerRef.validate(),
        sourceRef.validate(),
        destinationRef.validate(),
        datePickerRef.validate(),
      ];

      console.log(validations);

      if (validations.filter(v => !v).length === 0) {
        const date = datePickerRef.getValue();
        const amount = amountPickerRef.getValue();
        const cSource = sourceRef.getValue();
        const cDestination = destinationRef.getValue();
        const description = descriptionInputRef.handleGetValue();

        let data = {
          date: moment(date ? date : Date.now()).format(
            'YYYY-MM-DDTHH:mm:ss'
          ),
          value: amount,
          description,
          accountId: selectedButton === 1 ? cDestination?.id : cSource?.id,
          categoryId: selectedButton === 1 ? cSource?.id : cDestination?.id,
          accountToId: cDestination?.id,
          type: link,
        };



        if (this.state.mode === 'edit') {
          //@ts-ignore
          data.type = this.state.transaction.type;
        }

        const body: AxiosRequestConfig = {
          url: ApiService.Points.TRANSACTIONS,
          method: this.state.mode === 'edit' ? 'PATCH' : 'POST',
          data,
        };

        console.log(link);
        console.log(data);

        try {
          const request = await ApiService.request(body);
          console.log(request);

          this.setState({ fetching: false });

          const refresh = this.props.navigation.getParam('refresh');
          if (refresh) {
            console.log('refreshing');
            refresh();
          }
          NavigationService.goBack();
        } catch (error) {
          console.log('error', error.response);
          this.setState({ fetching: false });
        }
      }
    }
  };

  changeSelectedButton = (index: number) => {
    if (this.state.selectedButton !== index) {
      this.setState({ selectedButton: index });
    }
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

  renderTypeButton = (item: TypeButtonData, index: number) => (
    <TouchableOpacity
      onPress={() => this.changeSelectedButton(item.id)}
      activeOpacity={0.7}
      style={[
        styles.typeButtonContainer,
        index !== TypeButtons.length - 1 && styles.marginRight,
      ]}>
      <Icon
        name={item.icon}
        color={
          item.id === this.state.selectedButton
            ? item.selectedColor
            : Colors.dotGray
        }
        size={32}
      />
      <Text
        style={[
          GlobalStyles.headerSmall,
          styles.typeButtonTitle,
          item.id === this.state.selectedButton && {
            color: item.selectedColor,
          },
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <MainBackground>
        {this.state.loading ? (
          <Loader />
        ) : (
          <ScrollView style={GlobalStyles.mainPadding}>
            {this.state.mode !== 'edit' && (
              <>
                <Text style={GlobalStyles.headerSmall}>
                  {TranslationService.t('choose_transaction_type')}
                </Text>

                <View style={styles.typeButtonsContainer}>
                  {TypeButtons.map((v, index) =>
                    this.renderTypeButton(v, index)
                  )}
                </View>
              </>
            )}
            {this.state.selectedButton !== 0 && (
              <>
                <Text style={GlobalStyles.headerSmall}>
                  {TranslationService.t('details')}
                </Text>
                {this.state.selectedButton === 1 && (
                  <>
                    <CategoryPicker
                      ref={this.incomeCategoryPickerRef}
                      categories={this.state.categories.filter(
                        (category: Category) => !category.is_payout
                      )}
                      placeholder={TranslationService.t(
                        'category'
                      ).toLowerCase()}
                    />
                    <AccountPicker
                      ref={this.incomeAccountPickerRef}
                      accounts={this.state.accounts}
                      placeholder={TranslationService.t(
                        'account'
                      ).toLowerCase()}
                    />
                  </>
                )}

                {this.state.selectedButton === 2 && (
                  <>
                    <AccountPicker
                      ref={this.outcomeAccountPickerRef}
                      accounts={this.state.accounts}
                      placeholder={TranslationService.t(
                        'account'
                      ).toLowerCase()}
                    />
                    <CategoryPicker
                      ref={this.outcomeCategoryPickerRef}
                      categories={this.state.categories.filter(
                        (category: Category) => category.is_payout
                      )}
                      placeholder={TranslationService.t(
                        'category'
                      ).toLowerCase()}
                    />
                  </>
                )}

                {this.state.selectedButton === 3 && (
                  <>
                    <AccountPicker
                      showCurrency
                      ref={this.transferAccount1PickerRef}
                      accounts={this.state.accounts}
                      placeholder={TranslationService.t(
                        'source_account'
                      ).toLowerCase()}
                    />
                    <AccountPicker
                      showCurrency
                      ref={this.transferAccount2PickerRef}
                      accounts={this.state.accounts}
                      placeholder={TranslationService.t(
                        'destination_account'
                      ).toLowerCase()}
                    />
                    {this.state.accountCurrencyError && (
                      <ErrorMessage
                        error={'Konta muszą mieć taką samą walutę!'}
                      />
                    )}
                  </>
                )}

                <AmountPicker
                  ref={this.amountPickerRef}
                  placeholder={TranslationService.t('amount').toLowerCase()}
                />

                <DatePicker
                  ref={this.datePickerRef}
                  placeholder={TranslationService.t('date')}
                />

                <Input
                  ref={this.descriptionInputRef}
                  placeholder={TranslationService.t('description')}
                />

                <Button
                  text={
                    this.state.mode === 'edit'
                      ? TranslationService.t('save')
                      : TranslationService.t('add_transaction')
                  }
                  onPress={this.onSubmit}
                  loading={this.state.fetching}
                />
              </>
            )}
          </ScrollView>
        )}
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
  typeButtonTitle: {
    marginTop: 10,
  },
  typeButtonContainer: {
    flex: 1,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  marginRight: {
    marginRight: 15,
  },
});
