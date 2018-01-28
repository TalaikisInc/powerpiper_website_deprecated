import Router from 'next/router'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'

import Layout from '../../layout'
import Session from '../../components/Session'

class CheckEmail extends Component {
  static async getInitialProps({ req, res }) {
    const session = await Session.getSession({ force: true, req: req })
    if (session.user) {
      if (req) {
        res.redirect('/auth/callback')
      } else {
        Router.push('/auth/callback')
      }
    }

    return {
      session: session
    }
  }

  render() {
    console.log('------------ auth/check email session ---------------')
    console.log(this.props.session)

    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center'>
          <Heading>Check your email</Heading>
          <Paragraph>Please check your email for a sign in link.</Paragraph>
        </Section>
      </Layout>
    )
  }
}

CheckEmail.defaultProps = {
  title: 'Check Email',
  description: '',
  image: '',
  menu: false
}

export default CheckEmail
