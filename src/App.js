import React, { Component } from "react"

import Form from "./components/Form"
import Input from "./components/Input"

class App extends Component {
  state = {
    field1: "",
    field2: "",
    field3: "",

    formErrors: {
      field1: "",
      field2: "",
      field3: "",
    },
  }

  setError = (name, message) => {
    this.setState({
      ...this.state,
      formErrors: {
        ...this.state.formErrors,
        [name]: message,
      }
    })
  }

  validate = (name, value, rules, label = name) => {
    let message = ""

    if(rules.min && value.length < 3) {
      message = `"${label}" tulee olla vähintään ${rules.min} merkkiä pitkä`
    }

    if(rules.required && !value) {
      message = `"${label}" on pakollinen`
    }

    this.setError(name, message)
  }

  handleOnInputChange = (e, rules, label, validate) => {
    const { name, value } = e.target
    let oldValue = ""

    this.setState(prevState => {
      oldValue = prevState[name]

      return { [name]: value }
    }, () => {
      // Recover "onBlur" validating field after a value has been given
      if((!oldValue && !!value && !rules.min) || validate) {
        this.validate(name, value, rules, label)
      }
    })
  }

  handleOnInputBlur = (e, rules, label) => {
    const { name, value } = e.target

    this.validate(name, value, rules, label)
  }

  submitButtonDisabled = () => {
    return Object.keys(this.state.formErrors)
      .filter(e => !!this.state.formErrors[e]).length > 0
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Form errors={this.state.formErrors}>
                <Input
                  name="field1"
                  label="Required, onChange"
                  value={this.state.field1}
                  onChange={this.handleOnInputChange}
                  onBlur={this.handleOnInputBlur}
                  validateOn="change"
                  rules={{ required: true }}
                />

                <Input
                  name="field2"
                  label="Required, onBlur"
                  value={this.state.field2}
                  onChange={this.handleOnInputChange}
                  onBlur={this.handleOnInputBlur}
                  validateOn="blur"
                  rules={{ required: true }}
                />

                <Input
                  name="field3"
                  label="Required, onBlur, min 3 chars"
                  value={this.state.field3}
                  onChange={this.handleOnInputChange}
                  onBlur={this.handleOnInputBlur}
                  validateOn="blur"
                  rules={{ required: true, min: 3 }}
                />

                <button
                  type="submit"
                  className="button"
                  disabled={this.submitButtonDisabled()}
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App
