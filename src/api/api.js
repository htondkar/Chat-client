import axios from 'axios'
import endPoints from './endPoints'
// import { appendToFormData } from '../helpers/helpers'

class API {
  constructor() {
    const commonHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    this.config = token =>
      token
        ? {
            headers: {
              ...commonHeaders,
              Authorization: 'Bearer ' + token
            },
            validateStatus: () => true
          }
        : {
            headers: commonHeaders,
            validateStatus: () => true
          }
  }

  authenticate = values => {
    return axios.post(endPoints.signIn, values, this.config())
  }
}

const api = new API()

export default api
