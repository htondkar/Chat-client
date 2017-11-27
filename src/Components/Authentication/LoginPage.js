import LoginForm from './LoginForm'
import { Link } from 'inferno-router'
import Logo from '../common/Logo'
import form from './loginFormState'

const LoginPage = () => (
  <div class="page center-content-vertical login-page">
    <div class="center-content-vertical login-form">
      <Logo />
      <LoginForm form={form} />
      <Link to="sign-up" class="link">
        sign-up
      </Link>
    </div>
  </div>
)

export default LoginPage
