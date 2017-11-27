const baseURL = 'http://localhost:3333'

const urls = {
  signIn: 'sign-in'
}

const urlProxy = new Proxy(urls, {
  get(target, prop) {
    return `${baseURL}/${target[prop]}`
  }
})

export default urlProxy
