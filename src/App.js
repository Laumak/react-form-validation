import React, { Component } from "react"

import Form from "./components/Form"
import Input from "./components/Input"

class App extends Component {
  state = {
    field1: "",
    field2: "",

    formErrors: {
      field1: "",
      field2: "",
    },
  }

  handleOnInputChange = (e, required, label, validate) => {
    const { name, value } = e.target
    let oldValue = ""

    this.setState(prevState => {
      oldValue = prevState[name]

      return { [name]: value }
    }, () => {
      // Recover "onBlur" validating field after a value has been given
      if((!oldValue && !!value) || validate) {
        this.validate(name, value, required, label)
      }
    })
  }

  handleOnInputBlur = (e, required, label) => {
    const { name, value } = e.target

    this.validate(name, value, required, label)
  }

  validate = (name, value, required, label = name) => {
    let message = ""

    if(required && !value) {
      message = `${label} on pakollinen`
    }

    this.setError(name, message)
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
                  label="Required, validate onChange"
                  value={this.state.field1}
                  onChange={this.handleOnInputChange}
                  onBlur={this.handleOnInputBlur}
                  required={true}
                  validateOn="change"
                />

                <Input
                  name="field2"
                  label="Required, validate onBlur"
                  value={this.state.field2}
                  onChange={this.handleOnInputChange}
                  onBlur={this.handleOnInputBlur}
                  required={true}
                  validateOn="blur"
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
