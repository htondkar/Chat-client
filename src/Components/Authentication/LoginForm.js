import Component from 'inferno-component'
import form from './loginFormState'
import InputField from '../common/InputField'
import { observer } from 'inferno-mobx'
import broadcaster from '../../broadcaster/broadcaster'
import { browserHistory } from '../../index'

const LoginForm = observer(
  class LoginForm extends Component {
    componentDidMount() {
      broadcaster.subscribe({
        eventType: 'USER_DID_LOGIN',
        fn: () => browserHistory.push('/chat')
      })
    }

    render() {
      return (
        <form onSubmit={form.onSubmit} class="login-form-fields-wrapper">
          <InputField
            type="text"
            {...form.$('email').bind()}
            error={form.$('email').errors()}
          />
          <InputField
            {...form.$('password').bind()}
            error={form.$('password').errors()}
            type="password"
          />
          <div class="form-error">{form.errors()}</div>
          <button type="submit">Login</button>
        </form>
      )
    }
  }
)

export default LoginForm
