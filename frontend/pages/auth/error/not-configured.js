import { Component } from 'react'

import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import Heading from 'grommet/components/Heading'
import Section from 'grommet/components/Section'

import Layout from '../../../layout'

class NotConfigured extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center'>
          <Box>
            <Heading>Support for this service is not configured</Heading>
            <Label>Support for the requested oAuth provider has not been configured.</Label>
            <Label><a href="/auth/signin" className="grommetux-anchor">Use another method to sign in.</a></Label>
          </Box>
        </Section>
      </Layout>
    )
  }
}

NotConfigured.defaultProps = {
  title: 'Not Configured',
  description: '',
  image: '',
  menu: false
}

export default NotConfigured
