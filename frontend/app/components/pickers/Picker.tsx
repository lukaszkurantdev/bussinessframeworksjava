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
import IoniIcon from 'react-native-vector-icons/Ionicons';
//services
import TranslationService from '../../core/services/TranslationService';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

interface IProps {
  values: string[];
  placeholder: string;
  onChange?: (value: number) => void;
}

interface IState {
  selectedIndex: number | null;
  selectedTemporary: number | null;
  errorMessage: string | null;
}

export default class Picker extends React.Component<IProps, IState> {
  state: IState = {
    selectedIndex: null,
    errorMessage: null,
    selectedTemporary: null,
  };

  modal = React.createRef<Modal>();

  public getValue = (): string | null => {
    const { selectedIndex } = this.state;
    const { values } = this.props;

    if (selectedIndex !== null) {
      return values[selectedIndex];
    }
    return null;
  };

  public setValue = (value: string) => {
    const v = this.props.values.indexOf(
      this.props.values.filter(v => v === value)[0]
    );
    this.setState({
      selectedIndex: v,
      selectedTemporary: v,
    });
  };

  toggleModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.toggleModal();
      if (this.state.selectedIndex === null) {
        this.setState({ selectedTemporary: null });
      }
    }
  };

  public validate = () => {
    if (this.state.selectedIndex === null) {
      this.setState({ errorMessage: TranslationService.t('empty_input') });
    }

    return this.state.selectedIndex !== null;
  };

  private onChange = () => {
    const value = this.state.selectedTemporary;

    if (value !== null) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }

      this.setState({ selectedIndex: value, errorMessage: null }, () => {
        this.toggleModal();
      });
    }
  };

  chooseValue = (value: number) => {
    this.setState({ selectedTemporary: value });
  };

  renderCategory = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={() => this.chooseValue(index)}>
      <View style={styles.rowContainer}>
        <Text style={[GlobalStyles.accountHeader]}>{item}</Text>
      </View>
      {this.state.selectedTemporary === index && (
        <IoniIcon name="ios-checkmark" color={Colors.primary} size={30} />
      )}
    </TouchableOpacity>
  );

  render = () => {
    const value = this.getValue();

    return (
      <>
        <PickerBody
          value={value}
          placeholder={this.props.placeholder}
          error={this.state.errorMessage}
          validationError={this.state.errorMessage !== null}
          onPress={this.toggleModal}
        />

        <Modal
          ref={this.modal}
          title={
            this.props.placeholder[0].toUpperCase() +
            this.props.placeholder.substring(1)
          }>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatlistContent}
            extraData={this.state.selectedTemporary}
            renderItem={this.renderCategory}
            data={this.props.values}
          />
          <Button
            text={'Wybierz'}
            type={
              this.state.selectedTemporary === null ? 'Tertiary' : 'Primary'
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
