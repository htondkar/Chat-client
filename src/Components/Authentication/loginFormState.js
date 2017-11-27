import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'
import authStore from '../../stores/authStore'
import broadcaster from '../../broadcaster/broadcaster'

const plugins = { dvr: validatorjs }

const fields = [
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
  }
]

const hooks = {
  onSuccess(form) {
    const values = form.values()
    authStore.authenticate(values)
  },
  onError(form) {}
}

const form = new MobxReactForm({ fields }, { plugins, hooks })

const setErrorMessages = ({ payload }) => {
  const fields = {}

  form.each(field => {
    fields[field.name] = field
  })

  payload.forEach(error => {
    const field = fields[error.param]
    if (field) {
      field.invalidate(error.msg)
      field.showErrors()
    }
  })
}

broadcaster.subscribe({ fn: setErrorMessages, eventType: 'SIGN_IN_ERROR' })

export default form
