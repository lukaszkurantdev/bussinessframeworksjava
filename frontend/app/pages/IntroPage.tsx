import React, { createRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//componets
import IntroComponent, {
  IProps as IntroProps,
} from 'components/IntroComponent';
import MainBackground from 'components/MainBackground';
import Button from 'components/Button';
//styles
import Colors from 'styles/Colors';
//services
import NavigationService from 'core/services/NavigationService';
import Translation from 'core/services/TranslationService';
import StorageService from 'core/services/StorageService';
interface IState {
  slideActive: number;
}

const W_WIDTH = Dimensions.get('window').width;

const carouselData: IntroProps[] = [
  {
    svg: 'logo',
    text: Translation.t('intro_description'),
  },
  {
    svg: 'icon',
    header: Translation.t('accounts'),
    text: Translation.t('account_description'),
  },
  {
    svg: 'basket',
    header: Translation.t('categories'),
    text: Translation.t('categories_description'),
  },
  {
    svg: 'cash',
    header: Translation.t('transactions'),
    text: Translation.t('transaction_description'),
  },
  {
    header: Translation.t('ready') + '?',
    text: Translation.t('ready_description'),
  },
];

export default class IntroPage extends React.Component<{}, IState> {
  state: IState = {
    slideActive: 0,
  };

  //@ts-ignore
  carousel = createRef<Carousel>();

  renderCarouselPagination = () => (
    <Pagination
      dotsLength={5}
      activeDotIndex={this.state.slideActive}
      dotColor={Colors.primary}
      inactiveDotColor={Colors.dotGray}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
      dotStyle={styles.dotStyle}
    />
  );

  changeSlideActive = (slideActive: number) => {
    this.setState({ slideActive });
  };

  next = () => {
    const carousel = this.carousel.current;
    if (carousel && this.state.slideActive !== 4) {
      carousel.snapToNext();
    } else {
      StorageService.set(StorageService.Points.AFTERINTRO, 'x');
      NavigationService.mainNavigate('LoginPage');
    }
  };

  previous = () => {
    const carousel = this.carousel.current;
    if (carousel) {
      carousel.snapToPrev();
    }
  };

  renderCarouselComponent = ({
    item,
    index,
  }: {
    item: IntroProps;
    index: number;
  }) => {
    return (
      <IntroComponent
        style={styles.introComponent}
        svg={item.svg}
        header={item.header}
        text={item.text}
        key={index}
      />
    );
  };

  render = () => {
    return (
      <MainBackground style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.renderCarouselPagination()}
          <Carousel
            ref={this.carousel}
            removeClippedSubviews={false}
            data={carouselData}
            renderItem={this.renderCarouselComponent}
            sliderWidth={W_WIDTH}
            itemWidth={W_WIDTH - 30}
            containerCustomStyle={styles.carouselContainerCustomStyle}
            contentContainerCustomStyle={styles.carouselContentContainer}
            onSnapToItem={this.changeSlideActive}
          />
          <View style={styles.buttonContainer}>
            {this.state.slideActive !== 0 && (
              <Button
                onPress={this.previous}
                text={'Wstecz'}
                containerStyle={styles.button}
                style={styles.leftButton}
              />
            )}
            <Button
              onPress={this.next}
              text={'Dalej'}
              containerStyle={styles.flex}
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
    paddingBottom: 0,
  },
  contentContainer: {
    paddingBottom: 15,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  introComponent: {
    marginBottom: 40,
  },
  dotStyle: {
    height: 8,
    width: 8,
    borderRadius: 6,
  },
  carouselContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  carouselContainerCustomStyle: {
    marginHorizontal: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  button: {
    flex: 1,
    marginRight: 10,
  },
  leftButton: {
    backgroundColor: Colors.dotGray,
    marginRight: 10,
  },
});
