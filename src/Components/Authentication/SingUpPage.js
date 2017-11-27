import SignUpForm from './SignUpForm'
import { Link } from 'inferno-router'
import Logo from '../common/Logo'
import form from './signUpFormState'

const LoginPage = () => (
  <div class="page center-content-vertical sign-up-page">
    <div class="center-content-vertical sign-up-form">
      <Logo />
      <SignUpForm form={form} />
      <Link to="/" class="link">
        Login
      </Link>
    </div>
  </div>
)

export default LoginPage
