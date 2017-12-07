import authStore from './stores/authStore'

export default function(socket) {
  return {
    emitNewChat: (payload, cb) => {
      socket.emit('CREATE_NEW_CHAT', {
        ...payload,
        token: authStore.authState.token
      })

      return new Promise((resolve, reject) => {
        socket.on('NEW_CHAT', data => {
          cb && cb(null, data)
          resolve(data)
        })
      })
    },
    sendMessage: payload => {
      socket.emit('SEND_MESSAGE', {
        ...payload,
        token: authStore.authState.token
      })
    },
    listenForReceivedMessages: fn => {
      socket.on('RECEIVED_MESSAGE', fn)
    }
  }
}
