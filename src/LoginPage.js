import Component from 'inferno-component'
import LoginForm from './LoginForm'
import { Link } from 'inferno-router'

export default class LoginPage extends Component {
  render() {
    return (
      <div class="page center-content-vertical login-page">
        <LoginForm />
        <Link to="sign-up">sign-up</Link>
      </div>
    )
  }
}
