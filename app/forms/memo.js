import React, {Component} from 'react'
import { reduxForm } from 'redux-form'


class MemoForm extends Component {
  render() {
    const { fields: {text}, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label>Text</label>
        <input type="text" {...text}/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'memo',
  fields: ['text'],
})(MemoForm)
