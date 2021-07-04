import LocalizedStrings from 'react-native-localization';
import StorageService from './StorageService';
//source files
import pl from '../../assets/translations/pl';

/**
  * List of available languages.
*/
type Language = 'pl';

let Translation = new LocalizedStrings({ pl });

/**
  * Gets language of app from storage after starting the application.
*/
export const init = async () => {
  let lang = await StorageService.get(StorageService.Points.LANGUAGE);
  console.warn(lang)
  if (lang)
    Translation.setLanguage(lang);

  console.log(Translation)
}

/**
  * Changes current language of app and restart bundler.
  *
  * @param lang - Language from list of available languages.
  *
*/
export const changeLanguage = async (lang: Language) => {
  await StorageService.set(StorageService.Points.LANGUAGE, lang);
  Translation.setLanguage(lang);
}

/**
  * Returns translated string from source files.
  *
  * @param str - String contained in the translation source files.
  * @returns Translated string.
  *
*/
export const t = (str: string) => {
  return Translation.getString(str);
}

export default {
  init,
  changeLanguage,
  t
};
