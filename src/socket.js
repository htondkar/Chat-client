import authStore from './stores/authStore'

export default function(socket) {
  return {
    emitNewChat(payload, cb) {
      socket.on('NEW_CHAT', data => cb(null, data))

      socket.emit('CREATE_NEW_CHAT', {
        ...payload,
        token: authStore.authState.token
      })
    }
  }
}
