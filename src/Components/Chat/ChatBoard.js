import Component from 'inferno-component'
import { connect, observer } from 'inferno-mobx'

const ChatInfo = observer(({ withUser }) => (
  <div className="chat-info">{withUser.name}</div>
))

const Message = ({ message: { message, type } }) => (
  <div className={`message ${type === 'received' ? 'received' : 'sent'}`}>
    <div className="message-text">{message}</div>
  </div>
)

const Conversation = observer(({ messages }) => (
  <div className="conversation">
    {messages.map(message => <Message message={message} />)}
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
      activeChatInfo: { receiver, messages }
    }
  }) {
    return (
      <div className="chat-board">
        <ChatInfo withUser={findUserById(receiver)} />
        <Conversation messages={messages} />
        <TextField onMessage={onMessage} />
      </div>
    )
  }
}
