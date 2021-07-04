import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//components
import {
  SvgCard,
  SvgSmallLogo,
  SvgIcon,
  SvgBasket,
  SvgBarcode,
  SvgCash,
} from 'assets/svg';
//styles
import GlobalStyle from 'styles/GlobalStyles';
import Colors from 'styles/Colors';

type svg = 'logo' | 'icon' | 'basket' | 'barcode' | 'card' | 'cash';

interface SvgList {
  [index: string]: Object;
}

const svgList: SvgList = {
  logo: <SvgSmallLogo />,
  icon: <SvgIcon />,
  basket: <SvgBasket />,
  barcode: <SvgBarcode />,
  card: <SvgCard />,
  cash: <SvgCash />,
};

export interface IProps {
  svg?: svg;
  header?: string;
  text: string;
  style?: Object;
}

export default class IntroComponent extends React.Component<IProps> {
  renderSvg = () => this.props.svg && svgList[this.props.svg];

  render = () => (
    <View style={[styles.container, this.props.style]}>
      {this.props.svg && this.renderSvg()}
      {this.props.header && (
        <Text
          style={[
            GlobalStyle.headerMedium,
            styles.headerText,
            this.props.svg && styles.headerTextmarginTop,
          ]}>
          {this.props.header}
        </Text>
      )}
      <Text
        style={[
          GlobalStyle.headerSmall,
          styles.description,
          !this.props.svg && styles.descriptionLargeMargin,
        ]}>
        {this.props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: Colors.black,
    textAlign: 'center',
  },
  headerTextmarginTop: {
    marginTop: 100,
  },
  description: {
    marginTop: 15,
    textAlign: 'center',
  },
  descriptionLargeMargin: {
    marginTop: 50,
  },
});
