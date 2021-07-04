import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MainBackground from '../components/MainBackground';
import IconButton from 'components/IconButton';
//components
import Loader from 'components/Loader';
//services
import Translation from '../core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
import ApiService from 'core/services/ApiService';
//models
import { MenuElement } from 'core/models/Menu.model';
//styles
import GlobalStyles from 'styles/GlobalStyles';
import Colors from '../styles/Colors';

interface IState {
  loading: boolean;
  data: object[];
}

export default class ExchangeRatesPage extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
    data: [],
  };

  apiRequest = () => {};

  // renderMainSection = () => {
  //   return mainSectionContent.map((item: MenuElement) => (
  //     <IconButton
  //       icon={item.icon}
  //       key={item.id}
  //       text={item.text}
  //       onPress={() => this.navigation(item.page)}
  //     />
  //   ));
  // };

  navigation = (page: string) => {
    NavigationService.navigate(page);
  };

  renderRatesState = () => {};

  renderHeader = () => (
    <IconButton
      disable
      text={Translation.t('base_currency')}
      style={styles.header}
      textStyle={styles.headerText}>
      <Text style={[GlobalStyles.buttonText, styles.headerText]}>{'PLN'}</Text>
    </IconButton>
  );

  render = () => {
    return (
      <MainBackground>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View>{this.renderHeader()}</View>
          <View style={styles.mainContainer}>
            {this.state.loading ? <Loader /> : <View>{}</View>}
          </View>
        </ScrollView>
      </MainBackground>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  header: {
    backgroundColor: Colors.primaryDark,
    marginBottom: 20,
  },
  headerText: {
    color: Colors.white,
  },
  mainContainer: {
    width: '100%',
    flex: 1,
  },
});
