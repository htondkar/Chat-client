import io from 'socket.io-client'
import actionsWrapper from './socket'

const socket = io('http://localhost:3334')

const socketActions = actionsWrapper(socket)

export default socketActions
