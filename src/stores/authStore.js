import { observable, action, autorun } from 'mobx'
import api from '../api/api'
import broadcaster from '../broadcaster/broadcaster'
import { runIfResIsOk } from '../helpers/helpers'
import * as storage from './localStorage'

class authStore {
  authState = observable({
    authenticated: false,
    token: null,
    name: null,
    userId: null
  })

  setToken(token) {
    this.authState.authenticated = true
    this.authState.token = token
  }

  logUserIn(token, userInfo) {
    this.setToken(token)
    this.setUserInfo(userInfo)
    this.userDidLogin()
  }

  authenticate = action(values => {
    const onSuccessfulLogin = ({ data: { token, user } }) => {
      if (token) {
        this.logUserIn(token, user)
        storage.write(storage.storageKey, { token, user })
      }
    }

    const onLoginFail = ({ data }) => {
      broadcaster.broadcast({ eventType: 'SIGN_IN_ERROR', payload: data })
    }

    const resHandler = runIfResIsOk(onSuccessfulLogin, onLoginFail)

    api
      .authenticate(values)
      .then(resHandler)
      .catch(console.log)
  })

  setUserInfo(data) {
    this.authState.name = data.name
    this.authState.userId = data.id
  }

  userDidLogin() {
    broadcaster.broadcast({ eventType: 'USER_DID_LOGIN' })
  }

  signUp(values) {
    const onSuccessfulLogin = ({ data }) => {
      broadcaster.broadcast({ eventType: 'USER_DID_SIGN_UP' })
    }

    const onLoginFail = ({ data }) => {
      broadcaster.broadcast({ eventType: 'SIGN_UP_ERROR', payload: data })
    }

    const resHandler = runIfResIsOk(onSuccessfulLogin, onLoginFail)

    api
      .signUp(values)
      .then(resHandler)
      .catch(console.log)
  }

  checkPrevAuth() {
    if (storage.has(storage.storageKey)) {
      const authData = storage.read(storage.storageKey)
      this.logUserIn(authData.token, authData.user)
    }
  }

  register = autorun(() => {
    if (this.authState.authenticated) {
      import('../webSocket.js').then(({ default: webSocket }) => {
        webSocket.listenForReceivedMessages(data => {
          broadcaster.broadcast({ eventType: 'RECEIVED_MESSAGE', data })
        })
      })
    }
  })
}

const store = new authStore()

export default store
