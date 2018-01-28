import { Fragment, Component } from 'react'
import Router from 'next/router'
import cookie from 'react-cookies'

import Spinning from 'grommet/components/icons/Spinning'
import Box from 'grommet/components/Box'

import Session from '../../components/Session'

class CallBack extends Component {
  static async getInitialProps({ req }) {
    const session = await Session.getSession({ force: true, req: req })
    let redirectTo = '/dashboard/'
    if (session.user) {
      if (req) {
        // Read cookie redirect path - if one is set
        if (req.cookies && req.cookies['redirect_url'] && typeof req.cookies['redirect_url'] !== 'undefined') {
          redirectTo = req.cookies['redirect_url']
        }
      } else {
        // Read cookie redirect path and remove cookie on client - if one is set
        redirectTo = cookie.load('redirect_url') || redirectTo
      }

      // Allow relative paths only - strip protocol/host/port if they exist
      redirectTo = redirectTo.replace(/^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '')
      console.error('redirect to inside callback')
      console.error(redirectTo)
    }

    return {
      session: session,
      redirectTo: redirectTo
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      session: this.props.session
    }
  }

  async componentDidMount() {
    const session = await Session.getSession({ force: true })
    this.setState({
      session: session
    })

    if (session.user) {
      Router.push(this.props.redirectTo)
    }
  }

  render() {
    return (
      <Fragment>
        <Box align='center' justify='center'>
          <Spinning size='medium' />
        </Box>
      </Fragment>
    )
  }
}

export default CallBack
