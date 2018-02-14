import 'isomorphic-unfetch'
import Router from 'next/router'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import Image from 'grommet/components/Image'
import Animate from 'grommet/components/Animate'
import FormNextIcon from 'grommet/components/icons/base/FormNext'
import SocialShare from 'grommet/components/SocialShare'

import Layout from '../layout'
import Date from '../utils/helpers'
import hoc from '../utils/hoc'
import ENV from '../conf'

class Post extends Component {
  static async getInitialProps ({ req }) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${ENV.API_URL}/api/v1.0${req.url}`)
    const json = await res.json()

    return {
      post: json,
      title: json.Title,
      description: json.Title,
      image: `${ENV.IMAGES_URL}/${json.Image}`,
      authorUrl: `/author/${json.AuthorID.Username}/0/`,
      categoryUrl: `/category/${json.CategoryID.Slug}/0/`,
      postUrl: `${ENV.BASE_URL}/post/${json.Slug}/`,
      menu: true,
      langSelector: false
    }
  }

  render () {
    const authorName = this.props.post.AuthorID.FirstName ? `${this.props.post.AuthorID.FirstName} ${this.props.post.AuthorID.LastName}` : 'Anonymous'

    return (
      <Layout {...this.props}>
        <Section pad='large' align='center' justify='center' colorIndex='neutral-4'>
          {/* this one is added to allow for second section to become visible */}
        </Section>
        <Section full={false} pad='medium' align='center' justify='center' colorIndex='neutral-5'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }} keep={true}>
            <Heading align='center'>
              { /*<span class="dark"> */ }
                <a href={this.props.categoryUrl} className='grommetux-anchor' onMouseEnter={() => { Router.prefetch(this.props.categoryUrl) }}>
                  {this.props.post.CategoryID.Title}
                </a>  <FormNextIcon /> { this.props.post.Title }
              { /*</span>*/ }
            </Heading>
            <Paragraph>
              <span class="light">
                By <a href={this.props.authorUrl} className='grommetux-anchor' onMouseEnter={() => {Router.prefetch(this.props.authorUrl)}}>
                  { authorName }
                </a>
                &nbsp;|&nbsp;
                {Date(this.props.post.Date)}
              </span>
            </Paragraph>
            <Image alt={this.props.post.Title} src={this.props.image} size='large' />
            {/* this should be aplied to text: className='grommetux-paragraph grommetux-paragraph--xlarge' */}
            <div dangerouslySetInnerHTML={{ __html: this.props.post.Content }} />
            <div>
              <SocialShare link={this.props.postUrl} title={this.props.title} type='facebook' />
              <SocialShare link={this.props.postUrl} title={this.props.title} type='twitter' />
              <SocialShare link={this.props.postUrl} title={this.props.title} type='linkedin' />
              <SocialShare link={this.props.postUrl} title={this.props.title} type='google' />
              <SocialShare link={this.props.postUrl} title={this.props.title} type='email' />
            </div>
          </Animate>
        </Section>
      </Layout>
    )
  }
}

export default hoc({}, state => state)(Post)
