import { getTypes } from '~/store/mutation-types'

const types = getTypes('auth')

export default {
  [types.setAuthentication](state, data) {
    localStorage.setItem('token', data)
  },
  [types.setAuthoriser](state, data) {
    state.authUser = data
  },
  [types.clearAuthoriser](state) {
    state.authUser = null
  }
}