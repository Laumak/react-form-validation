import React, { Component } from "react"

import Input from "./components/Input"
import Former from "./components/Former"

class App extends Component {
  validate = (name, value) => {
    if(name === "field1" && !value) {
      return "Required"
    }

    return null
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <Former
                initialValues={{ field1: "", field2: "", field3: "" }}
                validate={this.validate}
                render={({ values, handleChange, handleSubmit, errors }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Input
                        name="field1"
                        label="Required, onChange"
                        value={values.field1}
                        onChange={handleChange}
                        error={errors.field1}
                        validateOn="change"
                        rules={{ required: true }}
                      />

                      <Input
                        name="field2"
                        label="Required, onBlur"
                        value={values.field2}
                        onChange={handleChange}
                        validateOn="blur"
                        rules={{ required: true }}
                      />

                      <Input
                        name="field3"
                        label="Required, onBlur, min 3 chars"
                        value={values.field3}
                        onChange={handleChange}
                        validateOn="blur"
                        rules={{ required: true, min: 3 }}
                      />

                      <button
                        type="submit"
                        className="button"
                        disabled={Object.keys(errors).length > 0}
                      >
                        Submit
                      </button>
                    </form>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App
