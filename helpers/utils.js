import validate from 'validate.js'
import countryCodes from '~/mock/countrycodes.json'

let randomPassword = (length) => {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    let pass = "";
    for (let x = 0; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

export const generatePwd = (length) => randomPassword(length || 8);

export const getPathFromUrl = (url) => url.split("?")[0];

export const firstCharUpperCase = (value) => { 
   if (!value) return ''
   return `${value.charAt(0).toUpperCase()}${value.substr(1, value.length)}`
}

export const firstEachWordUppercase = (value, splitCharacter='_') => {
  if (!value) return;
  var separateWord = value.toLowerCase().split(splitCharacter);
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
    separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

export const getSlug = (value, replaceCharacter='-') => {
  if(_.isEmpty(value)) return '';
    
  let slug;
  slug = value.toLowerCase().trim();

  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, replaceCharacter);
  slug = slug.replace(/ /gi, replaceCharacter);

  slug = slug.replace(/\-\-\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-\-/gi, replaceCharacter);
  slug = slug.replace(/\-\-/gi, replaceCharacter);
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

export const isEmail = (value) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
}

export const parseErrors = (fields, rules) => {
  const validationErrs = {}
  const errors = validate(fields, rules)
    if (errors) {
    Object.keys(errors).forEach((errorKey) => {
      validationErrs[errorKey] = errors[errorKey][0]
    })
    }
    return validationErrs
}

export const parseQueryString = (value) => {

    let str = value;
    let objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
};

export const getCountryCodeByCallingCode = async ($axios, callingCode) => {
  let countryCode = 'sg'
  if (callingCode) {
    try {
      const countries = await $axios.$get(`https://restcountries.eu/rest/v2/callingcode/${callingCode}?fields=name;alpha2Code`, {
        'no-authorization': true
      })
      const country = countries ? countries[0] : { alpha2Code: 'sg' }
      countryCode = country.alpha2Code.toLowerCase()
    } catch(err) {
      // console.log(err)
    }
  }

  return countryCode
}

export const getCountryCallingCode = (val) => {
  const country = countryCodes.find(o => o.dial_code === val)
  return country && country.code.toLowerCase()
}

export const getDisplayName = (val) => {
  if(val){
    if(val.name){
      return val.name;
    }
    else if(val.title){
      return val.title;
    }
    else if(val.subject){
      return val.subject;
    }
    else if(val.fullName) {
      return val.fullName;
    }
    else if(val.firstName || val.lastName) {
      return `${val.firstName || ""} ${val.lastName || ""}`
    }
    else  return "";
  }
  else return "";
}