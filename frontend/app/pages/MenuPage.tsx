import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainBackground from '../components/MainBackground';
import IconButton, { Icon as IconType } from 'components/IconButton';
//styles
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//services
import Translation from '../core/services/TranslationService';
//utils
import NavigationService from 'core/services/NavigationService';
import UserService from 'core/services/UserService';
//models
import { MenuElement } from 'core/models/Menu.model';

interface IState {
  loading: boolean;
}

const mainSectionContent: MenuElement[] = [
  {
    id: 'm1',
    icon: 'Account',
    text: Translation.t('accounts'),
    page: 'HomePage',
  },
  {
    id: 'm2',
    icon: 'Category',
    text: Translation.t('categories'),
    page: 'CategoriesPage',
  },
];

const toolsSectionContent: MenuElement[] = [
  {
    id: 't1',
    icon: 'Barcode',
    text: Translation.t('courses'),
    page: 'ExchangeRatesPage',
  },
  {
    id: 't2',
    icon: 'Card',
    text: Translation.t('scaner'),
    page: 'ReceiptsListPage',
  },
];

export default class MenuPage extends React.Component<{}, IState> {
  state: IState = {
    loading: false,
  };

  renderMainSection = () => {
    return mainSectionContent.map((item: MenuElement) => (
      <IconButton
        icon={item.icon}
        key={item.id}
        text={item.text}
        onPress={() => this.navigation(item.page)}
      />
    ));
  };

  renderToolsSection = () => {
    return toolsSectionContent.map((item: MenuElement) => (
      <IconButton
        icon={item.icon}
        key={item.id}
        text={item.text}
        onPress={() => this.navigation(item.page)}
      />
    ));
  };

  navigation = (page: string) => {
    NavigationService.navigate(page);
  };

  render = () => {
    return (
      <MainBackground>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View>{this.renderMainSection()}</View>
         
          <View style={styles.section}>
            <Text style={[GlobalStyles.buttonText, styles.titleText]}>
              {Translation.t('user')}
            </Text>
        
            <IconButton
              icon={'Logout'}
              text={Translation.t('logout')}
              textStyle={styles.logoutText}
              style={styles.button}
              onPress={UserService.logout}
            />
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
  section: {
    marginTop: 10,
  },
  titleText: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.secondary,
  },
  logoutText: {
    color: Colors.white,
  },
});
