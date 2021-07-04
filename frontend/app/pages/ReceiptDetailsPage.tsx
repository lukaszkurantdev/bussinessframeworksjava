import React from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
//component
import MainBackground from 'components/MainBackground';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { Receipt } from 'core/models/Receipt.model';
import GlobalStyles from 'styles/GlobalStyles';
import Colors from 'styles/Colors';
import Loader from 'components/Loader';

interface IState {
  data: Receipt;
  loading: boolean;
}

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class ReceiptDetailsPage extends React.Component<
  IProps,
  IState
> {
  state = {
    data: {
      name: this.props.navigation.getParam('name'),
      image: this.props.navigation.getParam('image'),
      description: this.props.navigation.getParam('description'),
      receipt_date: this.props.navigation.getParam('receipt_date'),
    },
    loading: true,
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  render = () => (
    <MainBackground style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}>
        <View style={styles.informationContainer}>
          <View style={styles.informationHeaderContainer}>
            <Text style={GlobalStyles.buttonText}>{this.state.data.name}</Text>
            <Text style={[GlobalStyles.textContentSmallSecondary, styles.date]}>
              {this.state.data.receipt_date}
            </Text>
          </View>
          <Text style={[GlobalStyles.textContentSmallSecondary, styles.date]}>
            {this.state.data.description}
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            source={{ uri: this.state.data.image }}
            style={styles.image}
            resizeMode={'contain'}
            onLoadEnd={this.onLoadEnd}
          />
          {this.state.loading && (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          )}
        </View>
      </ScrollView>
    </MainBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  informationContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  informationHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    flex: 1,
  },
  date: {
    color: Colors.dotGray,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
