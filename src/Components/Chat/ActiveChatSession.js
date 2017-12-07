import Component from 'inferno-component'
import { connect } from 'inferno-mobx'
import ChatBoard from './ChatBoard'

const NoActiveChat = () => (
  <div className="no-chat">Select a user to start chatting</div>
)

@connect(['chatsStore'])
export default class ActiveChatSession extends Component {
  render({ chatsStore: { isThereActiveChat } }) {
    return (
      <div className="active-chat-session">
        {isThereActiveChat ? <ChatBoard /> : <NoActiveChat />}
      </div>
    )
  }
}
