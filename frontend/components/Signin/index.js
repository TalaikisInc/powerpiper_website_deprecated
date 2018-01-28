import { Component, Fragment, PropTypes } from 'react'
import Router from 'next/router'

import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Label from 'grommet/components/Label'
import SocialFacebook from 'grommet/components/icons/base/SocialFacebook'
import SocialTwitter from 'grommet/components/icons/base/SocialTwitter'
import SocialGooglePlus from 'grommet/components/icons/base/SocialGooglePlus'
import SocialLinkedIn from 'grommet/components/icons/base/SocialLinkedin'

import Session from '../Session'

export default class Signin extends Component {
  static propTypes() {
    return {
      session: PropTypes.object.isRequired
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      session: this.props.session
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value.trim(),
      session: this.state.session
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await Session.signin(this.state.email)
      .then(() => {
        Router.push('/auth/check-email')
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <Fragment>
        <Label>If you don't have an account yet, one will be created when you sign in with any of followiung social networks:</Label>
        <Box>
          <Columns responsive={true} maxCount={4} size='small'>
            <Box>
              <p><a href="/auth/oauth/facebook"><SocialFacebook a11yTitle='Sign In with Facebook' /></a></p>
            </Box>
            <Box>
              <p><a href="/auth/oauth/google"><SocialGooglePlus a11yTitle='Sign In with Google' /></a></p>
            </Box>
            <Box>
              <p><a href="/auth/oauth/twitter"><SocialTwitter a11yTitle='Sign In with Twitter' /></a></p>
            </Box>
            <Box>
              <p><a href="/auth/oauth/linkedin"><SocialLinkedIn a11yTitle='Sign In with LinkedIn' /></a></p>
            </Box>
          </Columns>
        </Box>
        <Label>Or you can sign up using your email:</Label>
        <Box>
          <form id="signin" method="post" action="/auth/email/signin" onSubmit={this.handleSubmit}>
            <input name="_csrf" type="hidden" value={this.props.csrfToken} />
            <Paragraph>
              <Label htmlFor="email">Email address</Label><br/>
              <input name="email" type="text" placeholder="j.smith@example.com" id="email" value={this.state.email} onChange={this.handleEmailChange} />
            </Paragraph>
            <button color="dark" type="submit">Sign in with email</button>
          </form>
        </Box>
      </Fragment>
    )
  }
}
