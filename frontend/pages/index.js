import { translate } from 'react-i18next'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Animate from 'grommet/components/Animate'

import Layout from '../layout'
import Subscribe from '../components/Subscribe'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect(selected) {
    this.setState({
      ...this.state,
      selected
    })
  }

  render () {
    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center'>
          <Animate enter={{ animation: 'slide-up', duration: 400, delay: 300 }} keep={true}>
            <Box align='center' responsive={true}>
              <Heading align='center'>{t('common:welcome')}</Heading>
              <Subscribe />
            </Box>
          </Animate>
        </Section>
      </Layout>
    )
  }
}

Index.defaultProps = {
  title: 'Decentralized Energy Marketplace',
  description: 'Decentralized Energy Marketplace',
  image: '',
  menu: true
}

const Extended = translate(['common'], { i18n, wait: process.browser })(Index)

Extended.getInitialProps = async ({ req }) => {
  if (req && !process.browser) {
    return i18n.getInitialProps(req, ['common'])
  }
  return {}
}

export default Extended
