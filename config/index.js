const CONFIG = {
  development: {
    appName: process.env.NUXT_ENV_APP_NAME,
  },
  uat: {
    appName: process.env.NUXT_ENV_APP_NAME,
  },
  production: {
    appName: process.env.NUXT_ENV_APP_NAME,
  }
}

export const getConfig = env => CONFIG[env || 'development']
