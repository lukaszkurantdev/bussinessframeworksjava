import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MainBackground from '../components/MainBackground';
import IconButton from 'components/IconButton';
//styles
import Colors from '../styles/Colors';
//services
import Translation from '../core/services/TranslationService';
import NavigationService from 'core/services/NavigationService';
//models
import { MenuElement } from 'core/models/Menu.model';

interface IState {
  loading: boolean;
}

const mainSectionContent: MenuElement[] = [
  {
    id: 'm1',
    text: Translation.t('changeing_pasword'),
    page: 'ChangePasswordPage',
  },
];

export default class SettingsPage extends React.Component<{}, IState> {
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
