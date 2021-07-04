import React from 'react';
import {
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
//services
import TranslationService from '../../core/services/TranslationService';
//styles
import { Icons, IIcon } from '../../styles/Icons';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

interface IProps {
  placeholder: string;
  onChange?: (value: string) => void;
  type: 'category' | 'account';
  style?: Object;
}

interface IState {
  selectedIndex: number | null;
  selectedTemporary: number | null;
  validationError: boolean;
}

export default class IconPicker extends React.Component<IProps, IState> {
  state: IState = {
    selectedIndex: null,
    validationError: false,
    selectedTemporary: null,
  };

  modal = React.createRef<Modal>();

  public getValue = (): IIcon | null => {
    const { selectedIndex } = this.state;

    if (selectedIndex !== null) {
      return Icons[selectedIndex];
    }
    return null;
  };

  public setValue = (icon: string) => {
    const v = Icons.indexOf(Icons.filter(v => v.name === icon)[0]);
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
      this.setState({ validationError: true });
    }
  };

  private onChange = () => {
    const value = this.state.selectedTemporary;

    if (value !== null) {
      if (this.props.onChange) {
        this.props.onChange(Icons[value].name);
      }

      this.setState({ selectedIndex: value, validationError: false }, () => {
        this.toggleModal();
      });
    }
  };

  chooseValue = (value: number) => {
    this.setState({ selectedTemporary: value });
  };

  renderCategory = ({ item, index }: { item: IIcon; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={() => this.chooseValue(index)}>
      <Icon
        type={this.props.type}
        size={'medium'}
        color={
          this.state.selectedTemporary === index
            ? Colors.primary
            : Colors.grayDark
        }
        icon={item.name}
      />
    </TouchableOpacity>
  );

  render = () => {
    return (
      <>
        <PickerBody
          value={null}
          placeholder={this.props.placeholder}
          error={null}
          validationError={this.state.validationError}
          onPress={this.toggleModal}
          style={this.props.style}
        />

        <Modal ref={this.modal} title={TranslationService.t('color')}>
          <FlatList
            style={styles.flatList}
            extraData={this.state.selectedTemporary}
            renderItem={this.renderCategory}
            data={Icons}
            numColumns={4}
          />
          <Button
            text={TranslationService.t('select')}
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
    justifyContent: 'center',
    padding: 5,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatList: {
    maxHeight: 210,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    // marginHorizontal: 15,
    width: WIDTH - 30,
  },
});
