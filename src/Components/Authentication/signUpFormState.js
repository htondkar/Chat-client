import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'
import authStore from '../../stores/authStore'
import broadcaster from '../../broadcaster/broadcaster'

const plugins = { dvr: validatorjs }

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Your Name',
    rules: 'required|string|between:3,25'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email Address',
    rules: 'required|email|string'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    rules: 'required|string|between:5,25'
  },
  {
    name: 'passwordConfirmation',
    label: 'password confirmation',
    placeholder: 'Re-enter password',
    rules: 'required|string|between:5,25|same:password'
  }
]

const hooks = {
  onSuccess(form) {
    const values = form.values()
    authStore.signUp(values)
  }
}

const form = new MobxReactForm({ fields }, { plugins, hooks })

const setErrorMessages = ({ payload: { errors } }) => {
  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      const field = form.$(key)
      field.invalidate(errors[key].message)
      field.showErrors()
    }
  }
}

broadcaster.subscribe({ fn: setErrorMessages, eventType: 'SIGN_UP_ERROR' })

export default form
