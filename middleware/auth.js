// Nuxt Context
export default ({ store, route, redirect }) => {
  if (store.state.Auth.authUser) {
    return
  }
  return store
    .dispatch('verifyToken').then(() => {}).catch((err) => {
      // console.log(err)
    })
};
