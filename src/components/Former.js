import React from "react"
import PropTypes from "prop-types"

class Former extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    fields: PropTypes.object,
    validate: PropTypes.func,
  }

  static defaultProps = {
    onSubmit: () => {},
    validate: () => {},
  }

  state = {
    values : {},
    errors: {},
  }

  componentWillMount() {
    this.setState({
      values: this.props.initialValues,
      errors: this.props.initialValues,
    })
  }

  validate = (name, value) => {
    const error = this.props.validate(name, value)

    return this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        [name]: error,
      }
    })
  }

  handeChange = e => {
    const { name, value } = e.target

    this.setState(prevState => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [name]: value,
        },
      }
    }, () => {
      this.validate(name, value)
    })
  }

  onSubmit = e => {
    e.preventDefault()

    console.log("submitted")

    this.props.onSubmit()
  }

  render() {
    const props = {
      values: this.state.values,
      errors: this.state.errors,
      handleChange: this.handeChange,
      handleSubmit: this.onSubmit,
    }

    return this.props.render(props)
  }
}

export default Former
