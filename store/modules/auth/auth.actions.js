import { getTypes } from '~/store/mutation-types'
import Moralis from 'moralis'
import { firestore as db } from '~/config/firebase.config'

const types = getTypes('auth')

export default {
  async verifyToken({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await Moralis.User.current()
        if (user) {
          let address = user.get('ethAddress') || ''
          if (address) {
            let findUser = await db.collection('users').doc(address).get()
            if (findUser.exists) {
              let data = findUser.data()
              if (data) {
                commit(types.setAuthoriser, data)
                resolve(data)
              }
              else {
                commit(types.clearAuthoriser)
                reject('User not found')
              }
            }
            else {
              await Moralis.User.logOut()
              commit(types.clearAuthoriser)
              reject('User not found')
            }
          }
          else {
            await Moralis.User.logOut()
            commit(types.clearAuthoriser)
            reject('No user found')
          }
        }
        else {
          await Moralis.User.logOut()
          commit(types.clearAuthoriser)
          reject('No user found')
        }
      } catch (error) {
        // console.log(error);
      }
    })
  },

  async logout({commit}) {
    try {
      await Moralis.User.logOut()
      commit(types.clearAuthoriser)
    } catch (error) {
      // console.log(error);
    }
  },

  connectWallet({commit}, reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        await Moralis.authenticate().then(async (user) => {
          console.log(user);
          if(user) {
            let address = user.get("ethAddress");
            let findUser = await db.collection('users').doc(address).get()
            if(findUser.exists) {
              commit(types.setAuthoriser, findUser.data())
              resolve(findUser.data())
            } else {
              await db.collection('users').doc(address).set({
                address: address,
                isClaimed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
              }).then(async () => {
                let findUser = await db.collection('users').doc(address).get()
                commit(types.setAuthoriser, findUser.data())
                resolve(findUser.data())
              }).catch(err => {
                console.log(err);
              })
              let findUser = await db.collection('users').doc(address).get()
              commit(types.setAuthoriser, findUser.data())
              resolve(findUser.data());
            }
          }
        });
      } catch (error) {
        reject(error)
      }
    }
  )}
}
