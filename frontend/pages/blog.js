import 'isomorphic-unfetch'
import { Component } from 'react'

import Layout from '../layout'
import Block from '../components/Block'

const apiUrl = process.env.API_URL
const imagesUrl = process.env.IMAGES_URL

class Blog extends Component {
  static async getInitialProps (props) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${apiUrl}/api/v1.0/posts/${(props.page || '0')}/`)
    const json = await res.json()

    return {
      posts: json,
      title: 'Decentralized Energy Blog',
      description: 'Decentralized Energy Blog',
      image: `${imagesUrl}/${json[0].image}`,
      total: Object.keys(json).length,
      menu: true,
      langSelector: false
    }
  }

  render () {
    return (
      <Layout {...this.props}>
        {this.props.posts.map(item => <Block key={item.id} post={item} total={this.props.total} />)}
      </Layout>
    )
  }
}

export default Blog
