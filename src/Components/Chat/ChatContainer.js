import Component from 'inferno-component'

import authStore from '../../stores/authStore'
import { observer } from 'inferno-mobx'
import { browserHistory } from '../../index'
import api from '../../api/api'
import socketActions from '../../webSocket'

import PreviousChatSessions from './PreviousChatSessions'
import OnlineUsers from './OnlineUsers'
import ActiveChatSession from './ActiveChatSession'

const ChatContainer = observer(
  class ChatContainer extends Component {
    componentWillMount = () => {
      this.redirectIfNotAuthenticated()
    }

    redirectIfNotAuthenticated() {
      if (!authStore.authState.authenticated) {
        browserHistory.push('/')
      }
    }

    componentDidMount = async () => {
      if (!!authStore.authState.authenticated) {
        this.fetchUserChats()
        this.fetchAllUsers()
      }
    }

    async fetchAllUsers() {
      const { data: { data }, status } = await api.loadAllUsers(
        authStore.authState.token
      )
      const users = this.validateResponse(status, data)
      console.log(users)
    }

    async fetchUserChats() {
      const { data: { data: { chats }, status } } = await api.loadUserChats(
        authStore.authState.token
      )

      const verfiedChats = this.validateResponse(status, chats)
      console.log(verfiedChats)
    }

    validateResponse = (status, data) => (status < 400 ? data : null)

    render() {
      return (
        <div className="chat-container">
          <PreviousChatSessions />
          <ActiveChatSession />
          <OnlineUsers />
        </div>
      )
    }
  }
)

export default ChatContainer
