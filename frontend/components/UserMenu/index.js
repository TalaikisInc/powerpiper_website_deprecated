import { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'grommet/components/Button'
import LoginIcon from 'grommet/components/icons/base/Login'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import ContactInfoIcon from 'grommet/components/icons/base/ContactInfo'

import * as Actions from '../../utils/actions'
import SigninModal from '../SigninModal'

class UserMenu extends Component {
   constructor(props) {
     super(props)
     this._onOpenModal = this._onOpenModal.bind(this)
     this._onCloseModal = this._onCloseModal.bind(this)

     this.state = {
       modal: false
     }
   }


  _onCloseModal = () => {
    this.setState({ modal: false })
  }

   _handleLogout = () => {
     this.props.dispatch(Actions.requestLogout());
   }

   _onOpenModal = () => {
     this.setState({ modal: true })
   }

   render() {
     if (this.props.isAuthenticated) {
        return (
          <Box>
            <Box>
              <Button href='/account/' icon={<ContactInfoIcon />} label={this.props.user.firstName || this.props.user.email} />
            </Box>
            <Box>
              <Button icon={<LogoutIcon />} label='Logout' />
            </Box>
          </Box>
        )
      } else {
       return (
        <div>
          <Button onClick={this._onOpenModal} icon={<LoginIcon />} label='Sign In' />
          <SigninModal modal={this.state.modal} onCloseModal={this._onCloseModal} />
        </div>
      )
    }
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
}

UserMenu.defaultProps = {
  isAuthenticated: false
}

export default UserMenu
