import { Component } from 'react'

import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import Heading from 'grommet/components/Heading'
import Section from 'grommet/components/Section'

import Layout from '../../../layout'

class EmailError extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center'>
          <Box>
            <Heading>Unable to sign in</Heading>
            <Label>The link you tried to use to sign in was not valid.</Label>
            <Label><a href="/auth/signin" className="grommetux-anchor">Request a new sign in link.</a></Label>
          </Box>
        </Section>
      </Layout>
    )
  }
}

EmailError.defaultProps = {
  title: 'Sign In Error',
  description: '',
  image: '',
  menu: false
}

export default EmailError
