import { observable, action } from 'mobx'
import api from '../api/api'
import broadcaster from '../broadcaster/broadcaster'

class authStore {
  authState = observable({
    authenticated: false,
    token: null
  })

  authenticate = action(values => {
    api
      .authenticate(values)
      .then(({ data, status }) => {
        if (status < 400) {
          const token = data.token
          if (token) {
            this.authState.authenticated = true
            this.authState.token = token
            this.userDidLogin()
          }
        } else {
          broadcaster.broadcast({ type: 'SIGN_IN_ERROR', payload: data })
        }
      })
      .catch(console.log)
  })

  userDidLogin = () => {
    broadcaster.broadcast({type: "USER_DID_LOGIN"})
  }
}

const store = new authStore()

export default store
