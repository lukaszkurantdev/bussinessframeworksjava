import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
//components
import MainBackground from '../components/MainBackground';
import Button from '../components/Button';
import Input from '../components/Input';
import ComplexIconPicker from 'components/pickers/ComplexIconPicker';
import CategoryPicker from 'components/pickers/CategoryPicker';
//styles
import GlobalStyles from '../styles/GlobalStyles';
//services
import TranslationService from '../core/services/TranslationService';
import { Category } from 'core/models/Category.model';
import { AxiosRequestConfig } from 'axios';
import ApiService from 'core/services/ApiService';
import NavigationService from 'core/services/NavigationService';

interface IState {
  loading: boolean;
  icon: string | undefined;
  iconColor: string | undefined;
  mode: string | null;
  category: Category | null;
  baseCategoryId: number | null;
  categories: Category[];
  type: 'incomesData' | 'outcomesData';
  fetching: boolean;
}

interface IProps {
  navigation: any;
}

export default class AddCategoryPage extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    iconColor: undefined,
    icon: undefined,
    mode: this.props.navigation.getParam('mode'),
    baseCategoryId: this.props.navigation.getParam('baseCategoryId'),
    category: this.props.navigation.getParam('category'),
    categories: this.props.navigation.getParam('categories'),
    type: this.props.navigation.getParam('type'),
    fetching: false,
  };

  nameInputRef = React.createRef<Input>();
  iconPickerRef = React.createRef<ComplexIconPicker>();
  categoryPickerRef = React.createRef<CategoryPicker>();

  componentDidMount = () => {
    console.log(
      'testowe',
      this.state.categories.length !== 0,
      this.state.category?.subcategories?.length === 0
    );
    if (this.state.mode === 'edit' && this.state.category !== null) {
      this.setValues(this.state.category);
    }

    if (this.state.mode === 'add' && this.state.baseCategoryId) {
      const categoryPicker = this.categoryPickerRef.current;

      if (categoryPicker) {
        categoryPicker.setValue(this.state.baseCategoryId);
      }
    }
  };

  setValues = (category: Category) => {
    const nameInput = this.nameInputRef.current;
    const iconPicker = this.iconPickerRef.current;
    const categoryPicker = this.categoryPickerRef.current;

    if (nameInput && iconPicker) {
      nameInput.handleChange(category.name);
      iconPicker.setValues(category.icon, category.color);
    }

    if (categoryPicker && category.base_category?.id) {
      categoryPicker.setValue(category.base_category?.id);
    }
  };

  setData = async () => {
    this.setState({ fetching: true });

    const nameInput = this.nameInputRef.current;
    const iconPicker = this.iconPickerRef.current;
    const categoryPicker = this.categoryPickerRef.current;

    let category = null;

    if (categoryPicker) {
      category = categoryPicker.getValue();
    }

    if (nameInput && iconPicker) {
      const validations = [nameInput.validate(), iconPicker.validate()];

      if (validations.filter(v => !v).length === 0) {
        const name = nameInput.handleGetValue();
        const { color, icon } = iconPicker.getValues();
        const { mode, type } = this.state;

        let data = {
          name,
          icon,
          color,
          isPayout: type !== 'incomesData',
          id: mode === 'edit' ? category?.id : undefined,
        };

        console.log('do zmiany', data);

        const body: AxiosRequestConfig = {
          url: ApiService.Points.CATEGORIES,
          method: mode === 'edit' ? 'PUT' : 'POST',
          data,
        };

        try {
          const request = await ApiService.request(body);
          console.log(request.data);

          this.setState({ fetching: false });
          this.props.navigation.getParam('refresh')();
          NavigationService.goBack();
        } catch (error) {
          console.log(error.response);
          this.setState({ fetching: false });
        }
      }
    }
  };

  onChangeIconColor = (value: string) => {
    console.log(value);
    this.setState({ iconColor: value });
  };

  onChangeIcon = (value: string) => {
    this.setState({ icon: value });
  };

  render() {
    return (
      <MainBackground>
        <ScrollView style={GlobalStyles.mainPadding}>
          <ComplexIconPicker ref={this.iconPickerRef} type={'category'} />

          <Text style={[GlobalStyles.accountHeader, styles.header]}>
            {TranslationService.t('primary_info')}
          </Text>
          <Input
            ref={this.nameInputRef}
            placeholder={TranslationService.t('name')}
          />
          {(this.state.categories.length !== 0 ||
            this.state.category?.subcategories?.length === 0) && (
            <CategoryPicker
              ref={this.categoryPickerRef}
              categories={this.state.categories}
              placeholder={TranslationService.t('based_category')}
            />
          )}
          <Button
            text={
              this.state.mode === 'add'
                ? TranslationService.t('add_category')
                : TranslationService.t('save_changes')
            }
            onPress={this.setData}
          />
        </ScrollView>
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
});
