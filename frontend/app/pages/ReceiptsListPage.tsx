import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MainBackground from '../components/MainBackground';
//componenrs
import ReceiptComponent from 'components/ReceiptComponent';
import Button from 'components/Button';
import Loader from 'components/Loader';
//styles
import Colors from '../styles/Colors';
//services
import NavigationService from 'core/services/NavigationService';
import ApiService, { AxiosRequestConfig } from 'core/services/ApiService';
//models
import { Receipt } from 'core/models/Receipt.model';

interface IState {
  loading: boolean;
  data: Receipt[];
}

export default class ReceiptsListPage extends React.Component<{}, IState> {
  state: IState = {
    loading: true,
    data: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  lock = false;
  getData = async () => {
    if (this.lock) {
      return;
    }
    this.lock = true;
    this.setState({ loading: true });
    const body: AxiosRequestConfig = {
      url: ApiService.Points.RECEIPT,
      method: 'GET',
    };

    try {
      const response = await ApiService.request(body);
      console.log('res', response);
      this.setState({ data: response.data });
    } catch (error) {
      console.log('error', error.response);
    } finally {
      this.setState({ loading: false });
      this.lock = false;
    }
  };

  renderMainSection = () => {
    return this.state.data.map((item: Receipt) => (
      <ReceiptComponent
        key={item.id}
        text={item.name}
        date={item.receipt_date.slice(0, 10)}
        description={item.description}
        image={item.image}
        onPress={this.navigationToDetails}
      />
    ));
  };

  navigationToDetails = (receipt: Receipt) => {
    NavigationService.navigate('ReceiptDetailsPage', receipt);
  };

  addNewReceipt = () => {
    NavigationService.navigate('ReceiptAddPage', {
      refresh: this.getData,
    });
  };

  render = () => {
    return (
      <MainBackground style={styles.container}>
        {this.state.loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View>{this.renderMainSection()}</View>
            <Button
              textStyle={styles.buttonText}
              style={styles.button}
              text={'+'}
              onPress={this.addNewReceipt}
            />
          </ScrollView>
        )}
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
    height: 60,
  },
  buttonText: {
    fontSize: 40,
  },
  logoutText: {
    color: Colors.white,
  },
});
