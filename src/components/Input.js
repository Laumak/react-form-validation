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
    validateOn: PropTypes.oneOf([
      "change",
      "blur",
    ]),
    rules: PropTypes.shape({
      required: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  }

  static defaultProps = {
    label: null,
    onBlur: null,
    onFocus: null,
    validate: false,
    error: "",
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

    this.props.onChange(e, this.props.rules, this.props.label, validate)
  }

  handleOnBlur = e => {
    this.setState({ focus: false, blurred: true })

    if(this.props.onBlur) {
      this.props.onBlur(e, this.props.rules, this.props.label)
    }
  }

  handleonFocus = e => {
    this.setState({ focus: true })

    if(this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  render() {
    const { label, rules } = this.props

    return (
      <div className="field">
        { label && <label className="label">{label}</label> }

        <div className={`control ${rules.required ? "has-icons-right" : ""}`}>
          <input
            type="text"
            value={this.props.value}
            name={this.props.name}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onFocus={this.handleonFocus}
            className={`input ${this.props.error ? "is-danger" : ""}`}
          />

          {
            rules.required &&
              <span className="icon is-small is-right">
                <i className="fa fa-asterisk" style={{ color: "rgba(255, 56, 56, 0.75)" }}></i>
              </span>
          }
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
