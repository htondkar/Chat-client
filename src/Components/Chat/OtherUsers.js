import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

const UserRow = ({ user, onClick }) => (
  <div className="user-row" onClick={onClick}>
    {user.name}
  </div>
)

@connect(['chatsStore'])
class OtherUsers extends Component {
  render({ chatsStore: { users }, clickHandlerFactory }) {
    return (
      <div className="other-users">
        {users.map(user => (
          <UserRow user={user} onClick={clickHandlerFactory(user)} />
        ))}
      </div>
    )
  }
}

export default OtherUsers
