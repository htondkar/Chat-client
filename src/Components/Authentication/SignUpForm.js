import Component from 'inferno-component'
import form from './signUpFormState'
import InputField from '../common/InputField'
import { observer } from 'inferno-mobx'
import broadcaster from '../../broadcaster/broadcaster'
import { browserHistory } from '../../index'
import { NotificationManager } from 'react-notifications'

import 'react-notifications/lib/notifications.css'

const SignUpForm = observer(
  class SignUpForm extends Component {
    componentDidMount() {
      broadcaster.subscribe({
        eventType: 'USER_DID_SIGN_UP',
        fn: () => {
          browserHistory.push('/')
          NotificationManager.success(
            'You can now sign in',
            'Sign up was successful'
          )
        }
      })
    }

    render() {
      return (
        <form onSubmit={form.onSubmit} class="form-fields-wrapper">
          <InputField
            type="text"
            {...form.$('name').bind()}
            error={form.$('name').errors()}
          />
          <InputField
            {...form.$('email').bind()}
            error={form.$('email').errors()}
            type="email"
          />
          <InputField
            {...form.$('password').bind()}
            error={form.$('password').errors()}
            type="password"
          />
          <InputField
            {...form.$('passwordConfirmation').bind()}
            error={form.$('passwordConfirmation').errors()}
            type="password"
          />
          <div class="form-error">{form.errors()}</div>
          <button type="submit">Sign Up</button>
        </form>
      )
    }
  }
)

export default SignUpForm
