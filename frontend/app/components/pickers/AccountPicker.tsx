import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//componenets
import PickerBody from './components/PickerBody';
import Modal from '../Modal';
import Button from '../Button';
import Icon from '../items/Icon';
import IoniIcon from 'react-native-vector-icons/Ionicons';
//types
import { Account } from '../../core/models/Account.model';
//services
import TranslationService from '../../core/services/TranslationService';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

interface IProps {
  accounts: Account[];
  placeholder: string;
  onChange?: (value: number) => void;
  showCurrency?: boolean;
}

interface IState {
  selectedAccountIndex: number | null;
  selectedAccountTemporary: number | null;
  errorMessage: string | null;
}

export default class AccountPicker extends React.Component<IProps, IState> {
  state: IState = {
    selectedAccountIndex: null,
    errorMessage: null,
    selectedAccountTemporary: null,
  };

  modal = React.createRef<Modal>();

  public getValue = (): Account | null => {
    const { selectedAccountIndex } = this.state;
    const { accounts } = this.props;

    if (selectedAccountIndex !== null) {
      return accounts[selectedAccountIndex];
    }
    return null;
  };

  public setValue = (id: number) => {
    const { accounts } = this.props;

    let tempIndex = 0;
    const filtered = accounts.filter((v, index) => {
      if (v.id === id) {
        tempIndex = index;
        return true;
      }
      return false;
    });

    console.log('filtered', filtered.length, tempIndex);

    if (filtered.length === 1) {
      this.setState({
        selectedAccountIndex: tempIndex,
        selectedAccountTemporary: tempIndex,
      });
    }
  };

  toggleModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.toggleModal();
      if (this.state.selectedAccountIndex === null) {
        this.setState({ selectedAccountTemporary: null });
      }
    }
  };

  public validate = () => {
    if (this.state.selectedAccountIndex === null) {
      this.setState({ errorMessage: TranslationService.t('empty_input') });
    }

    return this.state.selectedAccountIndex !== null;
  };

  private onChange = () => {
    const value = this.state.selectedAccountTemporary;

    if (value !== null) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }

      this.setState({ selectedAccountIndex: value, errorMessage: null }, () => {
        this.toggleModal();
      });
    }
  };

  chooseValue = (value: number) => {
    this.setState({ selectedAccountTemporary: value });
  };

  renderCategory = ({ item, index }: { item: Account; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={() => this.chooseValue(index)}>
      <View style={styles.rowContainer}>
        <Icon
          type="account"
          size={'micro'}
          icon={item.icon}
          color={item.color}
        />
        <Text style={[GlobalStyles.accountHeader, styles.itemText]}>
          {item.name}
        </Text>
      </View>
      {this.state.selectedAccountTemporary === index && (
        <IoniIcon name="ios-checkmark" color={Colors.primary} size={30} />
      )}
    </TouchableOpacity>
  );

  render = () => {
    const category = this.getValue();
    let value = category !== null ? category.name : null;

    if (value !== null && this.props.showCurrency) {
      value += ' (' + category?.currency + ')';
    }

    return (
      <>
        <PickerBody
          value={value}
          placeholder={this.props.placeholder}
          error={this.state.errorMessage}
          onPress={this.toggleModal}
          validationError={!!this.state.errorMessage}
        />

        <Modal ref={this.modal} title={TranslationService.t('account')}>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatlistContent}
            extraData={this.state.selectedAccountTemporary}
            renderItem={this.renderCategory}
            data={this.props.accounts}
          />
          <Button
            text={'Wybierz'}
            type={
              this.state.selectedAccountTemporary === null
                ? 'Tertiary'
                : 'Primary'
            }
            onPress={this.onChange}
            style={styles.buttonContainer}
          />
        </Modal>
      </>
    );
  };
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 15,
  },
  flatList: {
    maxHeight: 200,
    marginTop: 10,
  },
  flatlistContent: {
    // paddingHorizontal: 15,
  },
  buttonContainer: {
    // marginHorizontal: 15,
    width: WIDTH - 30,
  },
});
