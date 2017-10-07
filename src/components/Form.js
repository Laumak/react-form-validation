import React from "react"
import PropTypes from "prop-types"

class Form extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
    fields: PropTypes.object,
    validate: PropTypes.func,
    errors: PropTypes.object,
  }

  static defaultProps = {
    onSubmit: () => {},
    errors: {},
    validate: () => {},
  }

  onSubmit = e => {
    e.preventDefault()

    console.log("submitted")

    this.props.onSubmit()
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if(child.type.name !== "Input") {
        return child
      }

      return React.cloneElement(child, {
        error: this.props.errors[child.props.name],
        validateForm: this.props.validate,
      })
    })

    return (
      <form onSubmit={this.onSubmit}>
        {childrenWithProps}
      </form>
    )
  }
}

export default Form
