import Vue from 'vue'
import { getConfig } from '../config'

const Config = getConfig(process.env.NODE_ENV)

Vue.prototype.$appConfig = {
  name: Config.appName || 'squid',
}