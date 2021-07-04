import React from 'react';
import moment from 'moment';
//componenets
import PickerBody from './components/PickerBody';
import Modal from '../Modal';
import DateTimePicker from '@react-native-community/datetimepicker';
//services
import TranslationService from '../../core/services/TranslationService';

interface IProps {
  placeholder: string;
  onChange?: (value: string) => void;
}

interface IState {
  selectedDate: Date | null;
  errorMessage: string | null;
  showPicker: boolean;
}

export default class DatePicker extends React.Component<IProps, IState> {
  state: IState = {
    selectedDate: null,
    errorMessage: null,
    showPicker: false,
  };

  public getValue = (): Date | null => {
    return this.state.selectedDate;
  };

  public getStringValue = (): string => {
    const date = this.getValue();
    if (date) {
      const year = date.getFullYear().toString();
      let month = date.getMonth().toString();
      let day = date.getDay().toString();
      if (day.length === 1) {
        day = '0' + day;
      }
      if (month.length === 1) {
        month = '0' + month;
      }
      return year + '-' + month + '-' + day;
    }
    return '';
  };

  public setValue = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  showPicker = () => {
    this.setState({ showPicker: true });
  };

  public validate = () => {
    if (this.state.selectedDate === null) {
      this.setState({ errorMessage: TranslationService.t('empty_input') });
    }

    return this.state.selectedDate !== null;
  };

  onChange = (event: any, selectedDate: any) => {
    if (this.props.onChange) {
      this.props.onChange(selectedDate);
    }
    this.setState({ selectedDate, showPicker: false, errorMessage: null });
  };

  render = () => {
    const date = this.getValue();
    const value = date === null ? null : new Date(date);
    return (
      <>
        <PickerBody
          value={value === null ? null : moment(value).format('DD.MM.YYYY')}
          placeholder={this.props.placeholder}
          error={this.state.errorMessage}
          onPress={this.showPicker}
          validationError={!!this.state.errorMessage}
        />
        {this.state.showPicker && (
          <DateTimePicker
            mode="date"
            value={value === null ? new Date() : value}
            onChange={this.onChange}
          />
        )}
      </>
    );
  };
}
