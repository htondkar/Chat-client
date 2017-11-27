import Component from 'inferno-component'
import { NotificationContainer } from 'react-notifications'

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
