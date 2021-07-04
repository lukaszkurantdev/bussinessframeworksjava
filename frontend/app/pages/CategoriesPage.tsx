import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  InteractionManager,
  RefreshControl,
} from 'react-native';
//components
import Loader from '../components/Loader';
import MainBackground from '../components/MainBackground';
import Button from '../components/Button';
import Modal from '../components/Modal';
import EmptyListContainer from '../components/EmptyListContainer';
import CategoryComponent from 'components/items/Category';
import AddItemFooter from 'components/items/AddItemFooter';
//models
import { Category } from '../core/models/Category.model';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import TranslationService from '../core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import { AxiosRequestConfig } from 'axios';
import ApiService from 'core/services/ApiService';

interface IState {
  loading: boolean;
  incomesData: Category[];
  outcomesData: Category[];
  refreshing: boolean;
  modalCategory: Category | null;
}

type DataType = 'incomesData' | 'outcomesData';

export default class CategoriesPage extends React.Component<{}, IState> {
  removeCategoryModal = React.createRef<Modal>();
  showDetailsModal = React.createRef<Modal>();

  state: IState = {
    loading: true,
    incomesData: [],
    outcomesData: [],
    refreshing: false,
    modalCategory: null,
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
      url: ApiService.Points.CATEGORIES,
      method: 'GET',
    };

    try {
      const request = await ApiService.request(body);
      console.log(request.data);

      this.setState({
        incomesData: request.data.filter((v: Category) => !v.is_payout),
        outcomesData: request.data.filter((v: Category) => v.is_payout),
        loading: false,
        refreshing: false,
      });
    } catch {}
  };

  removeCategory = async () => {
    const categoryToRemove = this.state.modalCategory;

    let body: AxiosRequestConfig = {
      url: ApiService.Points.CATEGORIES,
      method: 'DELETE',
      data: {
        id: categoryToRemove?.id,
      },
    };

    try {
      const request = await ApiService.request(body);
      console.log(request);
      console.log('removed', categoryToRemove?.id);
      // TO DO
      this.setState({ refreshing: true }, () => {
        const outcomesData = this.state.outcomesData.filter(
          v => v.id !== categoryToRemove?.id
        );

        const incomesData = this.state.incomesData.filter(
          v => v.id !== categoryToRemove?.id
        );

        this.setState({
          outcomesData,
          incomesData,
          loading: false,
          refreshing: false,
        });
        this.toggleShowModal();
        this.toggleRemoveModal();
        this.onRefresh();
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  addNewCategory = (type: DataType) => {
    NavigationService.navigate('AddCategoryPage', {
      mode: 'add',
      type: type,
      categories:
        type == 'incomesData'
          ? this.state.incomesData
          : this.state.outcomesData,
      refresh: this.onRefresh,
    });
  };

  addNewSubCategory = () => {
    this.toggleShowModal();

    const type = this.state.modalCategory?.is_payout
      ? 'outcomesData'
      : 'incomesData';
    NavigationService.navigate('AddCategoryPage', {
      mode: 'add',
      baseCategoryId: this.state.modalCategory?.id,
      type: type,
      categories:
        type == 'incomesData'
          ? this.state.incomesData
          : this.state.outcomesData,
      refresh: this.onRefresh,
    });
  };

  editCategory = () => {
    this.toggleShowModal();
    const type = this.state.modalCategory?.is_payout
      ? 'outcomesData'
      : 'incomesData';

    NavigationService.navigate('AddCategoryPage', {
      mode: 'edit',
      type: type,
      categories:
        type == 'incomesData'
          ? this.state.incomesData.filter(
              (v: Category) => v.id !== this.state.modalCategory?.id
            )
          : this.state.outcomesData.filter(
              (v: Category) => v.id !== this.state.modalCategory?.id
            ),
      category: this.state.modalCategory,
      refresh: this.onRefresh,
    });
  };

  toggleRemoveModal = () => {
    const removeCategoryModal = this.removeCategoryModal.current;
    if (removeCategoryModal) {
      removeCategoryModal.toggleModal();
    }
  };

  toggleShowModal = (modalCategory: Category | null = null) => {
    console.log('pr', modalCategory);
    this.setState({ modalCategory }, () => {
      const showDetailsModal = this.showDetailsModal.current;
      if (showDetailsModal) {
        showDetailsModal.toggleModal();
      }
    });
    console.log(modalCategory?.subcategories);
  };

  renderItem = ({ item, index }: { item: any; index: number }) => (
    <CategoryComponent
      item={item}
      index={index}
      onPress={() => this.toggleShowModal(item)}
      onPressSubItem={this.toggleShowModal}
      refreshing={this.state.refreshing}
    />
  );

  renderFooter = (type: DataType) => (
    <AddItemFooter
      title={TranslationService.t('add_category')}
      onPress={() => this.addNewCategory(type)}
    />
  );

  render = () => {
    return (
      <MainBackground>
        {this.state.loading ? (
          <Loader />
        ) : this.state.incomesData.length !== 0 ||
          this.state.outcomesData.length !== 0 ? (
          <ScrollView
            contentContainerStyle={GlobalStyles.mainPadding}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            <Text style={[GlobalStyles.accountHeader, styles.header1]}>
              {TranslationService.t('outcomes')}
            </Text>
            <FlatList
              extraData={this.state.refreshing}
              data={this.state.outcomesData}
              renderItem={it => this.renderItem(it)}
              scrollEnabled={false}
              keyExtractor={(item, index) => '' + index}
              ListFooterComponent={() => this.renderFooter('outcomesData')}
            />

            <Text style={[GlobalStyles.accountHeader, styles.header2]}>
              {TranslationService.t('incomes')}
            </Text>
            <FlatList
              extraData={this.state.refreshing}
              data={this.state.incomesData}
              renderItem={it => this.renderItem(it)}
              scrollEnabled={false}
              keyExtractor={(item, index) => '' + index}
              ListFooterComponent={() => this.renderFooter('incomesData')}
            />
          </ScrollView>
        ) : (
          <EmptyListContainer
            text={TranslationService.t('add_category_to_continue')}
            buttonText={TranslationService.t('add_category')}
            onPressButton={() => this.addNewCategory('outcomesData')}
          />
        )}

        <Modal
          ref={this.showDetailsModal}
          title={TranslationService.t('category')}>
          {this.state.modalCategory?.subcategories !== undefined && (
            <Button
              text={TranslationService.t('add_sub_category')}
              type="Tertiary"
              containerStyle={styles.firstButton}
              onPress={this.addNewSubCategory}
            />
          )}
          <Button
            text={TranslationService.t('edit')}
            type="Tertiary"
            containerStyle={styles.firstButton}
            onPress={this.editCategory}
          />
          <Button
            text={TranslationService.t('remove')}
            type="Secondary"
            onPress={this.toggleRemoveModal}
          />
        </Modal>

        <Modal
          ref={this.removeCategoryModal}
          title={TranslationService.t('remove_category')}>
          <Text style={[GlobalStyles.accountHeader, styles.removeText]}>
            {TranslationService.t('verify_remove_account_1')}
            <Text style={styles.colorSecondary}>
              {TranslationService.t('verify_remove_account_2')}
            </Text>
            {TranslationService.t('verify_remove_category_1')}
          </Text>
          <Button
            text={TranslationService.t('remove')}
            type="Secondary"
            onPress={this.removeCategory}
          />
        </Modal>
      </MainBackground>
    );
  };
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  removeText: {
    marginVertical: 20,
  },
  colorSecondary: {
    color: Colors.primary,
  },
  header1: {
    marginBottom: 15,
  },
  header2: {
    marginVertical: 15,
  },
  firstButton: {
    paddingBottom: 0,
  },
});
