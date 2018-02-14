import 'isomorphic-unfetch'
import { Component } from 'react'

import Section from 'grommet/components/Section'

import Layout from '../layout'
import Block from '../components/Block'
import hoc from '../utils/hoc'
import ENV from '../conf'

class Author extends Component {
  static async getInitialProps ({ req }) {
    // eslint-disable-next-line no-undef
    if (req) {
      const res = await fetch(`${ENV.API_URL}/api/v1.0${req.url}`)
      const json = await res.json()

      return {
        posts: json,
        title: `${json[0].author_id.LastName} ${json[0].author_id.FirstName} Blog`,
        description: `${json[0].author_id.LastName} ${json[0].author_id.FirstName} Blog`,
        image: `${ENV.IMAGES_URL}/${json[0].image}`,
        total: json[0].id,
        menu: true,
        langSelector: false
      }
    }
    return null
  }

  render () {
    return (
      <Layout {...this.props}>
        <Section pad='large' align='center' justify='center' colorIndex='neutral-4'>
          {/* this one is added to allow for second section to become visible */}
        </Section>
        <Section full={true} pad='none' align='center' justify='center' colorIndex='neutral-5'>
          {this.props.posts.map(item => <Block key={item.id} post={item} total={this.props.total} />)}
        </Section>
      </Layout>
    )
  }
}

export default hoc({}, state => state)(Author)
