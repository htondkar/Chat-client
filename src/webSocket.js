import io from 'socket.io-client'
import actionsWrapper from './socket'
import authStore from './stores/authStore'

const socket = io('http://localhost:3334', {
  query: {
    token: authStore.authState.token
  }
})

socket.on('WELCOME', data => console.log(data))

const socketActions = actionsWrapper(socket)

export default socketActions
