import { Component, Fragment, PropTypes } from 'react'
import { connect } from 'react-redux'

import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import SocialFacebook from 'grommet/components/icons/base/SocialFacebook'
import SocialTwitter from 'grommet/components/icons/base/SocialTwitter'
import SocialGooglePlus from 'grommet/components/icons/base/SocialGooglePlus'
import SocialLinkedIn from 'grommet/components/icons/base/SocialLinkedin'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Button from 'grommet/components/Button'

import * as Actions from '../../utils/actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this._handleSignin = this._handleSignin.bind(this)
    this._handleSignup = this._handleSignup.bind(this)
    this._handleEmailChange = this._handleEmailChange.bind(this)
    this._handlePasswordChange = this._handlePasswordChange.bind(this)
  }

  _handleEmailChange(event) {
    this.setState({
      email: event.target.value.trim()
    })
  }

  _handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  _handleSignin = (e) => {
    this.props.dispatch(Actions.requestSignin(this.state))
  }

  _handleSignup = (e) => {
    this.props.dispatch(Actions.requestSignup(this.state))
  }

  render() {
    return (
      <Fragment>
        <Label>If you don't have an account yet, one will be created when you sign in with any of followiung social networks:</Label>
        <Box>
          <Columns responsive={true} maxCount={4} size='small'>
            <Box responsive={true}>
              <p><a href="/auth/oauth/facebook"><SocialFacebook a11yTitle='Sign In with Facebook' /></a></p>
            </Box>
            <Box responsive={true}>
              <p><a href="/auth/oauth/google"><SocialGooglePlus a11yTitle='Sign In with Google' /></a></p>
            </Box>
            <Box responsive={true}>
              <p><a href="/auth/oauth/twitter"><SocialTwitter a11yTitle='Sign In with Twitter' /></a></p>
            </Box>
            <Box responsive={true}>
              <p><a href="/auth/oauth/linkedin"><SocialLinkedIn a11yTitle='Sign In with LinkedIn' /></a></p>
            </Box>
          </Columns>
        </Box>
        <Label>Or you can sign up using your email:</Label>
        <Tabs responsive={true} justify='center'>
          <Tab title='Sign In'>
            <Box responsive={true}>
              { /* action="/auth/email/signin" */ }
              <form id="signin" method="post" onSubmit={this._handleSignin}>
                <input name="_csrf" type="hidden" value={this.props.csrfToken} />
                <Box align='start' responsive={true}>
                  <Label htmlFor="email">
                    <span className='light'>
                      Email address
                    </span>
                  </Label>
                  <input name="email" type="text" placeholder="j.smith@example.com" id="email" value={this.state.email} onChange={this._handleEmailChange} />
                </Box>
                <Box align='start' responsive={true}>
                  <Label htmlFor="password">
                    <span className='light'>
                      Password
                    </span>
                  </Label>
                  <input name="password" type="password" id="password" value={this.state.password} onChange={this._handlePasswordChange} />
                </Box>
                <br />
                <Button type="submit" onClick={this._handleSignin} label="Sign in" />
              </form>
            </Box>
          </Tab>
          <Tab title='Sign Up'>
            <Box responsive={true}>
              <form id="signup" method="post" onSubmit={this._handleSignup}>
                <input name="_csrf" type="hidden" value={this.props.csrfToken} />
                <Box align='start' responsive={true}>
                  <Label htmlFor="email">
                    <span className='light'>
                      Email address
                    </span>
                  </Label>
                  <input name="email" type="text" placeholder="j.smith@example.com" id="email" value={this.state.email} onChange={this._handleEmailChange} />
                </Box>
                <Box align='start' responsive={true}>
                  <Label htmlFor="password">
                    <span className='light'>
                      Password
                    </span>
                  </Label>
                  <input name="password" type="password" id="password" value={this.state.password} onChange={this._handlePasswordChange} />
                </Box>
                <Box align='start' responsive={true}>
                  <Label htmlFor="verify">
                    <span className='light'>
                      Verify password
                    </span>
                  </Label>
                  <input name="verify" type="password" id="password" value={this.state.verify} onChange={this._handlePasswordChange} />
                </Box>
                <br />
                <Button type="submit" onClick={this._handleSignup} label="Sign up" />
              </form>
            </Box>
          </Tab>
        </Tabs>
      </Fragment>
    )
  }
}

export default connect(state => state)(Signin)
