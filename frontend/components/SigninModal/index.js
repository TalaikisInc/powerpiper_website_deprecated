import { Component } from 'react'
import PropTypes from 'prop-types'

import Layer from 'grommet/components/Layer'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'

import Signin from '../Signin'

class SigninModal extends Component {
  render() {
    return (
        <div>
          { this.props.modal && <Layer flush={true} closer={true} overlayClose={true} onClose={this.props.onCloseModal} align='center'>
            <Box pad='medium' responsive={true} colorIndex='neutral-3'>
              <Heading>
                Sign In / Sign Up
              </Heading>
              <Signin />
            </Box>
          </Layer>
          }
        </div>
    )
  }
}

SigninModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
}

export default SigninModal
