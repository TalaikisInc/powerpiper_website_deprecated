import { Component } from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'
import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import Image from 'grommet/components/Image'
import Animate from 'grommet/components/Animate'
import Box from 'grommet/components/Box'
import FormNextIcon from 'grommet/components/icons/base/FormNext'

import Date from '../../utils/helpers'
const imagesUrl = process.env.IMAGES_URL

export default class Block extends Component {
  render () {
    const image = `${imagesUrl}/${this.props.post.image}`
    const authorUrl = `/author/${this.props.post.author_id.Username}/0/`
    const categoryUrl = `/category/${this.props.post.category_id.Slug}/0/`
    const articleUrl = `/post/${this.props.post.slug}/`
    const visibility = this.props.post.id === this.props.total ? undefined : 'scroll'
    const excerpt = this.props.post.content.split('</p>', 1)[0] || this.props.post.content
    const authorName = this.props.post.author_id.FirstName ? `${this.props.post.author_id.FirstName} ${this.props.post.author_id.LastName}` : 'Anonymous'

    return (
      <Section full={false} pad='medium' justify='center'>
        <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }} keep={true} visible={visibility}>
          <Box align='center'>
            <Heading align='center'>
              <a href={categoryUrl} className='grommetux-anchor' onMouseEnter={() => {Router.prefetch(categoryUrl)}}>
                {this.props.post.category_id.Title}
              </a>  <FormNextIcon />
              <a href={articleUrl} className='grommetux-anchor' onMouseEnter={() => {Router.prefetch(articleUrl)}}>
                { this.props.post.title }
              </a>
            </Heading>
            <Paragraph>
              By <a href={authorUrl}
                className='grommetux-anchor'
                onMouseEnter={() => {Router.prefetch(authorUrl)}}>
                { authorName }
              </a>
              &nbsp;|&nbsp;
              {Date(this.props.post.date)}
            </Paragraph>
            <Image alt={this.props.post.title} src={image} size='large' />
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          </Box>
        </Animate>
      </Section>
    )
  }
}

Block.propTypes = {
  post: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}
