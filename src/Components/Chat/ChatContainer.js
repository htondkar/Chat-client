import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

import { browserHistory } from '../../index'
import api from '../../api/api'
import chatsStore from '../../stores/chatsStore'
import broadcaster from '../../broadcaster/broadcaster'
import OtherUsers from './OtherUsers'
import ActiveChatSession from './ActiveChatSession'

@connect(['authStore'])
class ChatContainer extends Component {
  componentWillMount = () => {
    this.redirectIfNotAuthenticated()

    broadcaster.subscribe({
      eventType: 'RECEIVED_MESSAGE',
      fn: this.handleIncomingMessage
    })
  }

  redirectIfNotAuthenticated() {
    if (!this.props.authStore.authState.authenticated) {
      browserHistory.push('/')
    }
  }

  componentDidMount = async () => {
    if (!!this.props.authStore.authState.authenticated) {
      this.fetchAllUsers()
    }
  }

  handleIncomingMessage = ({ data }) => {
    chatsStore.newMessage(data)
  }

  async fetchAllUsers() {
    const { data: { data }, status } = await api.loadAllUsers(
      this.props.authStore.authState.token
    )
    const response = this.validateResponse(status, data)
    response && chatsStore.setUsers(response.users)
  }

  validateResponse = (status, data) => (status < 400 ? data : null)

  userSelectionHandlerFactory = user => () => {
    if (chatsStore.doesChatExist(user._id)) {
      chatsStore.setActiveChatByUser(user._id)
    } else {
      import('../../webSocket').then(({ default: socketActions }) =>
        socketActions.emitNewChat({ with: user._id }).then(chatInfo => {
          chatsStore.addNewChat(chatInfo)
        })
      )
    }
  }

  render() {
    return (
      <div className="chat-container page">
        <OtherUsers clickHandlerFactory={this.userSelectionHandlerFactory} />
        <ActiveChatSession />
      </div>
    )
  }
}

export default ChatContainer
