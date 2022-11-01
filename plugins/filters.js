import Vue from "vue";
import moment from "moment";
import countryCodes from '~/mock/countrycodes.json'

export function firstCharUpperCase(value) {
  if (!value) return;
  return `${value.charAt(0).toUpperCase()}${value.substr(1, value.length)}`;
}

export function valueToDisplay(value, key='_') {
  if (!value) return;
  let separateWord = value.toLowerCase().split(key);
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
    separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

export function toUSD(value) {
  if (!value) return "-";
  return `$${value}`;
}

export function date(value, type = "ll") {
  if (!value) return "-";
  return moment(value).format(type);
}

export function formatCurrency(value) {
  if (value == null || value == undefined || isNaN(value) || typeof value !== "number") {
    return "$0";
  }
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // "SGD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
}

export function prettyBytes(num) {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  if (typeof num !== 'number' || isNaN(num)) {
    // throw new TypeError('Expected a number');
    return '-';
  }

  var exponent;
  var unit;
  var neg = num < 0;
  var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
  unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
}

export const getCountryFromCode = (value) => {
  const res = countryCodes.find(o => o.code === value);
  if(res){
    return res.name
  }
  else{
    return value
  }
}

export const generateCode = (value, size = 4) => {
  if (!(value && value.length > size)) {
    return value
  }
  let length = value.length
  let tempText = "";
  for (let i = 0; i < size; i++) {
    tempText += value[i];
  }
  tempText += '...';
  for (let i = length - size; i <= length - 1 ; i++) {
    tempText += value[i];
  }
  return tempText;
}

const filters = {
  firstCharUpperCase,
  valueToDisplay,
  toUSD,
  date,
  formatCurrency,
  prettyBytes,
  getCountryFromCode,
  generateCode
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export default filters;
