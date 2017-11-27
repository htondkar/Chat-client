import { observable, action } from 'mobx'
import api from '../api/api'
import broadcaster from '../broadcaster/broadcaster'
import { runIfResIsOk } from '../helpers/helpers'

class authStore {
  authState = observable({
    authenticated: false,
    token: null
  })

  setToken(token) {
    this.authState.authenticated = true
    this.authState.token = token
    this.userDidLogin()
  }

  authenticate = action(values => {
    const onSuccessfulLogin = ({ data: { token } }) => {
      if (token) this.setToken(token)
    }

    const onLoginFail = ({ data }) => {
      broadcaster.broadcast({ type: 'SIGN_IN_ERROR', payload: data })
    }

    const resHandler = runIfResIsOk(onSuccessfulLogin, onLoginFail)

    api
      .authenticate(values)
      .then(resHandler)
      .catch(console.log)
  })

  userDidLogin = () => {
    broadcaster.broadcast({ type: 'USER_DID_LOGIN' })
  }

  signUp = values => {
    const onSuccessfulLogin = ({ data }) => {
      broadcaster.broadcast({ type: 'USER_DID_SIGN_UP' })
    }

    const onLoginFail = ({ data }) => {
      broadcaster.broadcast({ type: 'SIGN_UP_ERROR', payload: data })
    }

    const resHandler = runIfResIsOk(onSuccessfulLogin, onLoginFail)

    api
      .signUp(values)
      .then(resHandler)
      .catch(console.log)
  }
}

const store = new authStore()

export default store
