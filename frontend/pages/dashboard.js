import { Component, Fragment } from 'react'
import Router from 'next/router'
import fetch from 'unfetch'
import cookie from 'react-cookies'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Columns from 'grommet/components/Columns'
import Label from 'grommet/components/Label'
import Button from 'grommet/components/Button'
import LinkIcon from 'grommet/components/icons/base/Link'
import UnlinkIcon from 'grommet/components/icons/base/Unlink'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import LoginIcon from 'grommet/components/icons/base/Login'
import SaveIcon from 'grommet/components/icons/base/Save'

import Layout from '../layout'
import Session from '../components/Session'

class DashBoard extends Component {
  static async getInitialProps({ req }) {
    return {
      session: await Session.getSession({ force: true, req: req })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session && props.session.user) ? true : false,
      name: '',
      email: '',
      emailVerified: false,
      linkedWithFacebook: false,
      linkedWithGoogle: false,
      linkedWithTwitter: false,
      alertText: null,
      alertStyle: null,
      gotProfile: false
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
  }

  async componentDidMount() {
    const session = await Session.getSession({ force: true })
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    })

    cookie.save('redirect_url', '/dashboard/', { path: '/' })

    this.getProfile()
  }

  getProfile() {
    fetch('/dashboard/user', {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(user => {
        if (!user.name || !user.email) {
          return
        }
        this.setState({
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          linkedWithFacebook: user.linkedWithFacebook,
          linkedWithGoogle: user.linkedWithGoogle,
          linkedWithTwitter: user.linkedWithTwitter,
          gotProfile: true
        })
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onSubmit(e) {
    // Submits the URL encoded form without causing a page reload
    e.preventDefault()

    this.setState({
      alertText: null,
      alertStyle: null
    })

    const formData = {
      _csrf: await Session.getCsrfToken(),
      name: this.state.name || '',
      email: this.state.email || ''
    }

    // URL encode form
    // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
    // the form also in browsers without JavaScript
    const encodedForm = Object.keys(formData).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    }).join('&')

    fetch('/dashboard/user', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedForm
    })
      .then(async res => {
        if (res.status === 200) {
          this.getProfile()
          this.setState({
            alertText: 'Changes to your profile have been saved',
            alertStyle: 'alert-success'
          })
          // Force update session so that changes to name or email are reflected
          // immediately in the navbar (as we pass our session to it)
          this.setState({
            session: await Session.getSession({ force: true }),
          })
        } else {
          this.setState({
            session: await Session.getSession({ force: true }),
            alertText: 'Failed to save changes to your profile',
            alertStyle: 'alert-danger'
          })
        }
      })
  }

  async handleSignoutSubmit(event) {
    event.preventDefault()
    await Session.signout()
    Router.push('/')
  }

  render() {
    if (this.state.isSignedIn === true) {
      const alert = (this.state.alertText === null) ? <div/> : <div className={`alert ${this.state.alertStyle}`} role="alert">{this.state.alertText}</div>

      return (
        <Layout {...this.props}>
          <Section full={false} pad='medium' align='center' justify='center'>
            <Box>
              <Heading>Your Account</Heading>
            </Box>
            { alert }
          </Section>
          <Section full={false} pad='medium' align='center' justify='center'>
            <Box align='center' alignContent='center' responsive={true} direction='row' size='auto'>
              <Label>
                Edit your profile
              </Label>
              <form method="post" action="/dashboard/user" onSubmit={this.onSubmit} className="grommetux-form grommetux-form--pad-large">
                <input name="_csrf" type="hidden" value={this.state.session.csrfToken} onChange={() => {}} />
                <Box pad='medium'>
                  <Label>Name: </Label>
                  <input name="name" value={this.state.name} onChange={this.handleChange} className="grommetux-text-input grommetux-input" />
                </Box>
                <Box pad='medium'>
                  <Label>Email:</Label>
                  <input name="email" value={(this.state.email.match(/.*@localhost\.localdomain$/)) ? '' : this.state.email} onChange={this.handleChange} className="grommetux-text-input grommetux-input" />
                </Box>
                <button type="submit" className="grommetux-button grommetux-button-invert"><SaveIcon /> Save Changes</button>
              </form>
            </Box>
            <Box align='center' alignContent='center' responsive={true} direction='row' size='auto' pad='medium'>
              <Label>
                Link your account
              </Label>
              <Paragraph>
                When you link your account to social networks, later you can access it with just one click.
              </Paragraph>
              <LinkedAccounts
                session={this.props.session}
                linkedWithFacebook={this.state.linkedWithFacebook}
                linkedWithGoogle={this.state.linkedWithGoogle}
                linkedWithTwitter={this.state.linkedWithTwitter}
                gotProfile={this.state.gotProfile} />
            </Box>
            <Box align='center' alignContent='center' responsive={true} direction='row' size='auto' pad='medium'>
              <Label>
                Sign out
              </Label>
              <Paragraph>
                If you sign out, you can sign in again at any time.
              </Paragraph>
              <Box>
                <form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignoutSubmit}>
                  <input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
                  <button type="submit" className="grommetux-button grommetux-button-invert"><LogoutIcon /> Sign Out</button>
                </form>
              </Box>
            </Box>
          </Section>
        </Layout>
      )
    } else {
      return (
        <Layout session={this.props.session} title={this.props.loginTitle}>
          <Section full={false} pad='medium' align='center' justify='center'>
            <Box>
              <Label>
                <a href="/auth/signin" className="grommetux-button grommetux-button-invert"><LoginIcon /> Sign in</a>
              </Label>
            </Box>
          </Section>
        </Layout>
      )
    }
  }
}

// eslint-disable-next-line
export class LinkedAccounts extends Component {
  render() {
    if (typeof window === 'undefined' || this.props.gotProfile !== true) {
      return null
    } else {
      return (
        <Fragment>
          <Box>
            <LinkAccount provider="Facebook" session={this.props.session} linked={this.props.linkedWithFacebook}/>
          </Box>
          <Box>
            <LinkAccount provider="Google" session={this.props.session} linked={this.props.linkedWithGoogle}/>
          </Box>
          <Box>
            <LinkAccount provider="Twitter" session={this.props.session} linked={this.props.linkedWithTwitter}/>
          </Box>
          <Box>
            <LinkAccount provider="LinkedIn" session={this.props.session} linked={this.props.linkedWithLinkedIn}/>
          </Box>
        </Fragment>
      )
    }
  }
}

// eslint-disable-next-line
export class LinkAccount extends Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`} method="post">
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <Paragraph>
            <button type="submit">
              <UnlinkIcon /> Unlink from {this.props.provider}
            </button>
          </Paragraph>
        </form>
      )
    } else if (this.props.linked === false) {
      return (
        <button type="submit">
          <a href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            <LinkIcon /> Link with {this.props.provider}
          </a>
        </button>
      )
    } else {
      return (<Paragraph />)
    }
  }
}

DashBoard.defaultProps = {
  title: 'Dashbord',
  description: 'Dashbord',
  image: '',
  loginTitle: 'Sign In',
  menu: true
}

export default DashBoard
