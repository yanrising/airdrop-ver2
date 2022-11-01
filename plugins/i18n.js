// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import config from '../../config/config';

// Vue.use(VueI18n)

// export default ({ app, store }) => {
//   // Set i18n instance on app
//   // This way we can use it in middleware and pages asyncData/fetch
//   app.i18n = new VueI18n({
//     locale: store.state.locale,
//     fallbackLocale: 'en',
//     messages: {
//       en: require('../../locales/en.json'),
//       fr: require('../../locales/fr.json')
//     }
//   })

//   app.i18n.path = (link) => {
//     if (app.i18n.locale === app.i18n.fallbackLocale) {
//       return `/${link}`
//     }

//     return `/${app.i18n.locale}/${link}`
//   }
// }


import Vue from 'vue'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import { getConfig } from '../config'
import { resolve } from 'path'

const Config = getConfig(process.env.NODE_ENV)

const i18n = {
    locale: 'en',
    name: 'English',
    thumbnail: '',
    fallbackLocale: 'en',
    loadedLanguages: [],
    messages: {},
    setI18n: function(lang) {
        this.locale = lang
        setI18nLanguage(lang)
    },
    resetI18n: function() {
        this.locale = this.fallbackLocale
        this.loadedLanguages = []
        this.messages = {}
    }
}

function setI18nLanguage(lang) {
    localStorage.setItem("lang", lang)
    document.querySelector('html').setAttribute('lang', lang)
}

function getI18nMessage(val) {
    if (!val) return
    if (!i18n.messages[i18n.locale]) return val
    return i18n.messages[i18n.locale][val] || val
}

export default function loadLanguageAsync() {
    Vue.prototype.$i18n = i18n
    Vue.prototype.$t = getI18nMessage
    return new Promise((resolve) => {
        resolve("success")
    })
    
    console.log(`Making request for loading locate languages.`)
    // axios.defaults.headers['Authorization'] = localStorage.getItem('token')
    const lang = localStorage.getItem("lang") || "en"
    return axios.get(`${Config.apiEndpoint}/api/localization/?page=1&pageSize=20`, {
        params: {
            query: {
                status: 'published',
                channels: {
                    $in: ['cms']
                }
            }
        }
    }).then((res) => {
        if (res && res.data && !isEmpty(res.data.rows)) {
            i18n.resetI18n()
            res.data.rows.forEach((o) => {
                const { 
                    data, languageCode, language, languageImage
                } = o
                i18n.messages[languageCode] = data
                i18n.loadedLanguages.push({
                    code: languageCode,
                    name: language,
                    photo: languageImage
                })
            })
            const findDefault = res.data.rows.find(o => o.languageCode === lang)
            if (findDefault) {
                i18n.name = findDefault.language
                i18n.thumbnail = findDefault.languageImage
                i18n.setI18n(lang)
            }
        }

        Vue.prototype.$i18n = i18n
        Vue.prototype.$t = getI18nMessage

        return i18n
    }).catch((e) => {
        // console.log(e)
        Vue.prototype.$i18n = i18n
        Vue.prototype.$t = getI18nMessage
    })
}