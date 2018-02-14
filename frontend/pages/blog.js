import 'isomorphic-unfetch'
import { Component } from 'react'

import Section from 'grommet/components/Section'

import Layout from '../layout'
import Block from '../components/Block'
import hoc from '../utils/hoc'
import ENV from '../conf'

class Blog extends Component {
  static async getInitialProps (props) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${ENV.API_URL}/api/v1.0/posts/${(props.page || '0')}/`)
    const json = await res.json()

    return {
      posts: json,
      title: 'Decentralized Energy Blog',
      description: 'Decentralized Energy Blog',
       image: `${ENV.IMAGES_URL}/${json[0].image}`, // @ FIXME
      total: Object.keys(json).length,
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
        <Section full={false} pad='large' align='center' justify='center' colorIndex='neutral-5'>
          {this.props.posts.map(item => <Block key={item.id} post={item} total={this.props.total} />)}
        </Section>
      </Layout>
    )
  }
}

export default hoc({}, state => state)(Blog)
