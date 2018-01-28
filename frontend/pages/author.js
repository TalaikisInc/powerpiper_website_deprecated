import 'isomorphic-unfetch'
import { Component } from 'react'

import Layout from '../layout'
import Block from '../components/Block'

const apiUrl = process.env.API_URL
const imagesUrl = process.env.IMAGES_URL

export default class Author extends Component {
  static async getInitialProps ({ req }) {
    // eslint-disable-next-line no-undef
    if (req) {
      const res = await fetch(`${apiUrl}/api/v1.0${req.url}`)
      const json = await res.json()

      return {
        posts: json,
        title: `${json[0].author_id.LastName} ${json[0].author_id.FirstName} Blog`,
        description: `${json[0].author_id.LastName} ${json[0].author_id.FirstName} Blog`,
        image: `${imagesUrl}/${json[0].image}`,
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
        {this.props.posts.map(item => <Block key={item.id} post={item} total={this.props.total} />)}
      </Layout>
    )
  }
}
