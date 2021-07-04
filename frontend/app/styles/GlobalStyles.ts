import { StyleSheet } from 'react-native';
//styles
import Fonts from './Fonts';
import Colors from './Colors';

const GlobalStyles = StyleSheet.create({
  headerBig: {
    fontFamily: Fonts.regular,
    fontSize: 30,
    color: Colors.white,
  },
  headerMedium: {
    fontFamily: Fonts.regular,
    fontSize: 20,
    color: Colors.black,
    textAlign: 'left',
    marginTop: 3,
  },
  headerSmall: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.black,
  },
  buttonText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.black,
  },
  accountHeader: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.whiteSecondary,
  },
  headerSmallRegular: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.black,
    textAlign: 'left',
    marginTop: 3,
  },
  textContentSmall: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.gray,
    marginTop: 3,
  },
  textContentSmallSecondary: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.black,
    marginTop: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  mainPadding: {
    paddingHorizontal: 15,
  },
});

export default GlobalStyles;
