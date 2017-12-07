import Component from 'inferno-component'
import { NotificationContainer } from 'react-notifications'
import broadcaster from './broadcaster/broadcaster'

broadcaster.subscribe({
  eventType: 'USER_DID_LOGIN',
  fn: () => {
    import('./webSocket')
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <div className="app">{this.props.children}</div>
        <NotificationContainer />
      </div>
    )
  }
}

export default App
