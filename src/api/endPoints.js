const baseURL = 'http://localhost:3333'

const urls = {
  signIn: 'sign-in',
  signUp: 'sign-up',
  fetchAllUsers: 'users/list',
  fetchUserChats: 'chats/list'
}

const urlProxy = new Proxy(urls, {
  get(target, prop) {
    return `${baseURL}/${target[prop]}`
  }
})

export default urlProxy
