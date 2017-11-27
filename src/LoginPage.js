import Component from 'inferno-component'
import LoginForm from './LoginForm'
import { Link } from 'inferno-router'
import Logo from './common/Logo'
import form from './loginFormState'

export default class LoginPage extends Component {
  render() {
    return (
      <div class="page center-content-vertical login-page">
        <div className="center-content-vertical login-form">
          <Logo />
          <LoginForm form={form} />
          <Link to="sign-up" class="link">
            sign-up
          </Link>
        </div>
      </div>
    )
  }
}
