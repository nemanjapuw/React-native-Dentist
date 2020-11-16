import { Platform, Animated, Easing, UIManager, LayoutAnimation, PixelRatio, Dimensions, I18nManager } from "react-native";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
// import Moment from 'moment';

const scaleValue = PixelRatio.get() / 2;
export const STRIPE_PUBLISHABLE_KEY = "pk_test_FqonhmYPoEoOZvLFFIPAv7uY00xT9BfC7X"
export const SANDBOX_ACCOUNT = "sb-kzja473104893@business.example.com";
export const CLIENT_ID = "AbAS5NWsuoI807j07xQfOviDJf07Qr3VQlIY2zN_oG8ExOYTqpkkBaJMGlQ8IguU9TihquiCc0BwnX0j";
export const SECRET = "ECs2rbMZiTGOmEjpBfcypyHGYcCvKn1tMdnAfAhYs17NjavUKcH4r6_ZxFrMb7DfSQphmHliD7q_9Gsv";
export const PAYPAL_PATH = "https://api.sandbox.paypal.com";
//export const SERVER_HOST = "http://10.0.2.2:8083";
export const SERVER_HOST = "http://162.214.162.11/";
export const EMAIL_VALIDATE = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;


const translationGetters = {
  en: () => require("../lang/en.json"),  
  fr: () => require("../lang/fr.json"),  
  pt: () => require("../lang/pt.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export function setI18nConfig() {
  const fallback = { languageTag: "pt", isRTL: false };

  // const { languageTag, isRTL } =
  //   RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  //   fallback;
  const { languageTag, isRTL } = fallback;
  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;   
};

export function stateList() {
  let index = 0;
  let state_list = [    
    { key: index++, label: 'UF' },
    { key: index++, label: 'AC' },
    { key: index++, label: 'AL' },
    { key: index++, label: 'AP' },
    { key: index++, label: 'AM' },
    { key: index++, label: 'BA' },
    { key: index++, label: 'CE' },
    { key: index++, label: 'ES' },
    { key: index++, label: 'GO' },
    { key: index++, label: 'MA' },
    { key: index++, label: 'MT' },
    { key: index++, label: 'MS' },
    { key: index++, label: 'MG' },
    { key: index++, label: 'MT' },
    { key: index++, label: 'MS' },
    { key: index++, label: 'MG' },
    { key: index++, label: 'PA' },
    { key: index++, label: 'PB' },
    { key: index++, label: 'PR' },
    { key: index++, label: 'PE' },
    { key: index++, label: 'Pl' },
    { key: index++, label: 'PJ' },
    { key: index++, label: 'RN' },
    { key: index++, label: 'PS' },
    { key: index++, label: 'PO' },
    { key: index++, label: 'PR' },
    { key: index++, label: 'SC' },
    { key: index++, label: 'SP' },
    { key: index++, label: 'SE' },
    { key: index++, label: 'TO' },
    { key: index++, label: 'DF' },
  ];
  return state_list;
};

export function filterList() {
  let index = 0;
  let state_list = [
    { key: index++, section: true, label: 'Filter Planejamentos por data', value: "Filter scheduled by date" },
    { key: index++, label: 'Hoje', value: "today" },
    { key: index++, label: 'Ontem', value: "yesterday" },
    { key: index++, label: 'Essa emana', value: "month" },
    { key: index++, label: 'Este mes', value: 'month' },
    { key: index++, label: 'Mes anterior', value: "last_month" },
    { key: index++, label: 'Esse ano', value: "year" },
    { key: index++, label: 'Ano anterior', value: "last_year" }
    // { key: index++, label: 'Personalizado', value: "custome" },
  ];
  return state_list;
};

export function genders() {
  let index = 0;
  let gender_list = [
    { key: index++, label: 'Masculino' },
    { key: index++, label: 'Feminino' }
  ];
  return gender_list;
};

export function searchTooth(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].key === nameKey) {
      return myArray[i];
    }
  }
};

export function cutString(string_name) {
  //if(string_name.length > 12) string_name = string_name.substring(0, 9)+'...';
  return string_name;
}

export function isEmpty(obj) {
  if (obj !== undefined && obj != null) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
  }
  return true;
}

export function locals() {
  let index = 0;
  let local_list = [
    { key: index++, label: 'Casa' },
    { key: index++, label: 'Trabalho' }
  ];
  return local_list;
};

export function implantConnections() {
  let index = 0;
  let list = [
    { id: index++, option: 'he', label: 'HE' },
    { id: index++, option: 'hi', label: 'HI' },
    { id: index++, option: 'cm', label: 'CM' },
    { id: index++, option: 'ti', label: 'TI' },
    { id: index++, option: 'base', label: 'BASE' }
  ];
  return list;
};

export function implantCrowns() {
  let index = 0;
  let list = [
    { id: index++, option: 'screwed', label: 'COROA PARAFUSADA' },
    { id: index++, option: 'cemented', label: 'COROA CIMENTADA' }
  ];
  return list;
};