import React, { Component } from "react"
import PropTypes from "prop-types"

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    error: PropTypes.string,
    validate: PropTypes.bool,
    validateForm: PropTypes.func,
    required: PropTypes.bool,
    validateOn: PropTypes.oneOf([
      "change",
      "blur",
    ]),
  }

  static defaultProps = {
    label: null,
    onBlur: null,
    onFocus: null,
    validate: false,
    error: "",
    required: false,
    validateOn: "blur",
  }

  state = {
    dirty: false,
    blurred: false,
    focus: false,
  }

  handleOnChange = e => {
    this.setState({ dirty: true })

    const validate = this.props.validateOn === "change"

    this.props.onChange(e, this.props.required, this.props.label, validate)
  }

  handleOnBlur = e => {
    this.setState({ focus: false, blurred: true })

    if(this.props.onBlur) {
      this.props.onBlur(e, this.props.required, this.props.label)
    }
  }

  handleonFocus = e => {
    this.setState({ focus: true })

    if(this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  render() {
    return (
      <div className="field">
        {
          this.props.label &&
            <label className="label">{this.props.label}</label>
        }

        <div className="control">
          <input
            type="text"
            value={this.props.value}
            name={this.props.name}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onFocus={this.handleonFocus}
            className={`input ${this.props.error ? "is-danger" : ""}`}
          />
        </div>

        {
          this.props.error &&
            <p className="help is-danger">{this.props.error}</p>
        }
      </div>
    )
  }
}

export default Input
