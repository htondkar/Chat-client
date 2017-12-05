import io from 'socket.io-client'
import authStore from './stores/authStore'

const socket = io('http://localhost:3334')

export function emitNewChat(payload, cb) {
  socket.on('NEW_CHAT', data => cb(null, data))

  socket.emit('CREATE_NEW_CHAT', {
    ...payload,
    token: authStore.authState.token
  })
}
