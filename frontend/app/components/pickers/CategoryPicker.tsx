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
import { Category } from '../../core/models/Category.model';
//services
import TranslationService from '../../core/services/TranslationService';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

interface IProps {
  categories: Category[];
  placeholder: string;
  onChange?: (value: number) => void;
}

interface IState {
  selectedCategoryIndex: number | null;
  selectedCategoryTemporary: number | null;
  errorMessage: string | null;
}

export default class CategoryPicker extends React.Component<IProps, IState> {
  state: IState = {
    selectedCategoryIndex: null,
    errorMessage: null,
    selectedCategoryTemporary: null,
  };

  modal = React.createRef<Modal>();

  public getValue = (): Category | null => {
    const { selectedCategoryIndex } = this.state;
    const { categories } = this.props;

    if (selectedCategoryIndex !== null) {
      return categories[selectedCategoryIndex];
    }
    return null;
  };

  public setValue = (baseCategoryId: number | null) => {
    if (baseCategoryId !== null) {
      const v = this.props.categories.indexOf(
        this.props.categories.filter(v => v.id === baseCategoryId)[0]
      );
      this.setState({
        selectedCategoryIndex: v,
        selectedCategoryTemporary: v,
      });
    }
  };

  toggleModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.toggleModal();
      if (this.state.selectedCategoryIndex === null) {
        this.setState({ selectedCategoryTemporary: null });
      }
    }
  };

  public validate = () => {
    if (this.state.selectedCategoryIndex === null) {
      this.setState({ errorMessage: TranslationService.t('empty_input') });
    }

    return this.state.selectedCategoryIndex !== null;
  };

  private onChange = () => {
    const value = this.state.selectedCategoryTemporary;

    if (value !== null) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }

      this.setState(
        { selectedCategoryIndex: value, errorMessage: null },
        () => {
          this.toggleModal();
        }
      );
    }
  };

  chooseValue = (value: number) => {
    this.setState({ selectedCategoryTemporary: value });
  };

  renderCategory = ({ item, index }: { item: Category; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={() => this.chooseValue(index)}>
      <View style={styles.rowContainer}>
        <Icon
          type="category"
          size={'micro'}
          icon={item.icon}
          color={item.color}
        />
        <Text style={[GlobalStyles.accountHeader, styles.itemText]}>
          {item.name}
        </Text>
      </View>
      {this.state.selectedCategoryTemporary === index && (
        <IoniIcon name="ios-checkmark" color={Colors.primary} size={30} />
      )}
    </TouchableOpacity>
  );

  render = () => {
    const category = this.getValue();
    const value = category !== null ? category.name : null;

    return (
      <>
        <PickerBody
          value={value}
          placeholder={this.props.placeholder}
          error={this.state.errorMessage}
          onPress={this.toggleModal}
          validationError={!!this.state.errorMessage}
        />

        <Modal ref={this.modal} title={TranslationService.t('category')}>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatlistContent}
            extraData={this.state.selectedCategoryTemporary}
            renderItem={this.renderCategory}
            data={this.props.categories}
          />
          <Button
            text={'Wybierz'}
            type={
              this.state.selectedCategoryTemporary === null
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
