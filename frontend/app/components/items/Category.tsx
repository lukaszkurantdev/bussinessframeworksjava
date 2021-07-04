import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//components
import CategoryIcon from './Icon';
//types
import { Category } from '../../core/models/Category.model';
//styles
import GlobalStyles from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';

interface IProps {
  item: Category;
  index: number;
  refreshing?: boolean;
  onPress: () => void;
  onPressSubItem: (category: Category | null) => void;
}

interface ISingleCategoryProps {
  item: Category;
  onPress: () => void;
}

interface ISubCategoryProps {
  item: Category;
  index: number;
  onPress: () => void;
  subLength: number;
}

const MainCategory = (props: IProps) => (
  <View style={styles.itemMargin}>
    <Animatable.View
      style={styles.itemContainer}
      animation="fadeIn"
      duration={500}
      delay={100 * props.index + 200}
      useNativeDriver>
      <CategorySingle item={props.item} onPress={props.onPress} />
    </Animatable.View>
    <FlatList
      extraData={props.refreshing}
      data={props.item.subcategories || []}
      renderItem={it =>
        SubCategory({
          item: it.item,
          index: it.index,
          onPress: () => props.onPressSubItem(it.item),
          subLength: props.item.subcategories
            ? props.item.subcategories.length
            : 0,
        })
      }
      scrollEnabled={false}
      keyExtractor={(item2, index2) => '' + index2}
    />
  </View>
);

const CategorySingle = (props: ISingleCategoryProps) => (
  <TouchableOpacity
    style={styles.item}
    onPress={props.onPress}
    activeOpacity={0.7}>
    <View style={styles.insideItemContainer}>
      <CategoryIcon
        type="category"
        size="small"
        color={props.item.color}
        icon={props.item.icon}
      />
      <View style={styles.textItemContainer}>
        <Text style={[GlobalStyles.accountHeader]}>{props.item.name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SubCategory = (props: ISubCategoryProps) => (
  <View style={styles.subItemContainer}>
    <View style={styles.indicatorContainer}>
      <View style={styles.indicatorLine1} />
      <View style={styles.indicatorLine2} />
      <View
        style={[
          styles.indicatorLine1,
          props.index === props.subLength - 1 && styles.transparentBackground,
        ]}
      />
    </View>

    <Animatable.View
      style={[
        styles.itemContainer,
        styles.itemMarginTop,
        props.index !== props.subLength - 1 && styles.itemMarginBottom,
        props.index === 0 && styles.itemMarginTopBig,
      ]}
      animation="fadeIn"
      duration={500}
      delay={100 * props.index + 200}
      useNativeDriver>
      <CategorySingle item={props.item} onPress={props.onPress} />
    </Animatable.View>
  </View>
);

export default MainCategory;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  subItemContainer: {
    flexDirection: 'row',
  },
  itemMargin: {
    marginVertical: 5,
  },
  itemMarginTop: {
    marginTop: 5,
  },
  itemMarginTopBig: {
    marginTop: 10,
  },
  itemMarginBottom: {
    marginBottom: 5,
  },
  item: {
    height: 60,
    backgroundColor: Colors.itemGray,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  insideItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemContainer: {
    marginLeft: 10,
  },
  indicatorContainer: {
    width: 60,
    alignItems: 'center',
  },
  indicatorLine1: {
    backgroundColor: Colors.itemGray,
    flex: 1,
    width: 1,
  },
  indicatorLine2: {
    backgroundColor: Colors.itemGray,
    height: 1,
    width: 31,
    marginLeft: 30,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
});
