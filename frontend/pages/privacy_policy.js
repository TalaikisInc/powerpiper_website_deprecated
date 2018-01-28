import 'isomorphic-unfetch'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import Animate from 'grommet/components/Animate'

import Layout from '../layout'
const apiUrl = process.env.API_URL

export default class PrivacyPolicy extends Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${apiUrl}/api/v1.0/flatpage/Privacy Policy/`)
    const json = await res.json()

    return {
      post: json,
      title: json.Title,
      description: json.Title,
      image: '',
      menu: true,
      langSelector: false
    }
  }

  render () {
    return (
      <Layout {...this.props}>
        <Section full={false} pad='medium' align='center' justify='center'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }} keep={true} visible={this.visibility}>
            <Heading align='center'>
              {this.props.post.Title} 
            </Heading>
            <Paragraph align='start' size='large'>
              <div dangerouslySetInnerHTML={{ __html: this.props.post.Content }} />
            </Paragraph>
          </Animate>
        </Section>
      </Layout>
    )
  }
}
