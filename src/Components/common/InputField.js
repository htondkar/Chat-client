import { observer } from 'inferno-mobx'

const InputField = observer(props => (
  <div>
    <input {...props} />
    <div class="form-error">{props.error && props.error}</div>
  </div>
))

export default InputField
