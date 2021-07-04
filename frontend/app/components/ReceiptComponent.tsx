import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
//models
import { Receipt } from 'core/models/Receipt.model';

interface IProps {
  image: string;
  text: string;
  date: string;
  description: string;
  style?: object;
  textStyle?: object;
  dateTextStyle?: object;
  onPress?: (item: Receipt) => void;
}

export default class ReceiptComponent extends React.Component<IProps> {
  onPress = () => {
    if (this.props.onPress) {
      console.log({
        image: this.props.image,
        receipt_date: this.props.date,
        description: this.props.description,
        name: this.props.text,
      });
      this.props.onPress({
        image: this.props.image,
        receipt_date: this.props.date,
        description: this.props.description,
        name: this.props.text,
      });
    }
  };

  render = () => (
    <Animatable.View
      style={styles.itemContainer}
      animation="fadeIn"
      duration={500}
      useNativeDriver>
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.8}
        style={[styles.item, this.props.style]}>
        <View style={styles.insideItemContainer}>
          <Image source={{ uri: this.props.image }} style={styles.image} />
          <View style={styles.textItemContainer}>
            <Text style={[GlobalStyles.buttonText, this.props.textStyle]}>
              {this.props.text}
            </Text>
            <Text
              style={[
                GlobalStyles.textContentSmallSecondary,
                styles.date,
                this.props.dateTextStyle,
              ]}>
              {this.props.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  itemContainer: {
    borderRadius: 10,
    marginVertical: 7,
    overflow: 'hidden',
  },
  item: {
    minHeight: 60,
    backgroundColor: Colors.itemGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  insideItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  date: {
    color: Colors.dotGray,
  },
});
