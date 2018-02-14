import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class MainBody extends Component {
  render() {
    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }
}

MainBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ])
}

export default MainBody
