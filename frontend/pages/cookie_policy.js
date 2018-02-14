import 'isomorphic-unfetch'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import Animate from 'grommet/components/Animate'

import Layout from '../layout'
import hoc from '../utils/hoc'
import ENV from '../conf'

class CookiePolicy extends Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${ENV.API_URL}/api/v1.0/flatpage/Cookie Policy/`)
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
        <Section pad='large' align='center' justify='center' colorIndex='neutral-4'>
          {/* this one is added to allow for second section to become visible */}
        </Section>
        <Section full={true} pad='medium' align='center' justify='center' colorIndex='neutral-2'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }} keep={true} visible={this.visibility}>
            <Heading align='center'>
              <span className="dark">
                {this.props.post.Title} 
              </span>
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

export default hoc({}, state => state)(CookiePolicy)
