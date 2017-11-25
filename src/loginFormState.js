import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs'

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
    alert('Form is valid! Send the request here.')
    // get field values
    console.log('Form Values!', form.values())
  },
  onError(form) {
    alert('Form has errors!')
    // get all form errors
    console.log('All form errors', form.errors())
  }
}

const form = new MobxReactForm({ fields }, { plugins, hooks })

export default form
