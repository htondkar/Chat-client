import Component from 'inferno-component'
import { connect, observer } from 'inferno-mobx'

const ChatInfo = observer(({ withUser }) => (
  <div className="chat-info">{withUser.name}</div>
))

const Message = ({ message }) => <div className="message">{message}</div>

const Conversation = observer(({ conversation }) => (
  <div className="conversation">
    {conversation.map(message => <Message message={message} />)}
  </div>
))

class TextField extends Component {
  onSubmit = event => {
    event.preventDefault()
    const form = event.target
    const input = form['main-input']
    this.props.onMessage(input.value)
    input.value = ''
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} class="chat-text-input" autocomplete="off">
        <input
          type="text"
          autoFocus
          id="main-input"
          placeholder="Start Typing..."
        />
      </form>
    )
  }
}

@connect(['chatsStore'])
export default class ChatBoard extends Component {
  render({
    chatsStore: {
      onMessage,
      findConversationWith,
      findUserById,
      activeChatInfo: { receiver }
    }
  }) {
    return (
      <div className="chat-board">
        <ChatInfo withUser={findUserById(receiver)} />
        <Conversation conversation={findConversationWith(receiver._id)} />
        <TextField onMessage={onMessage} />
      </div>
    )
  }
}
