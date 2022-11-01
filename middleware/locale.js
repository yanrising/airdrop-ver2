import loadLanguageAsync from '~/plugins/i18n'

export default ({store, route}) => {
  return loadLanguageAsync().then(() => {
    // Do stuff
    return
  })
}