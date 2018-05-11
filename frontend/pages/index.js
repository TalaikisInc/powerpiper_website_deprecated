import { translate } from 'react-i18next'
import { Component } from 'react'

import Section from 'grommet/components/Section'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'
import Paragraph from 'grommet/components/Paragraph'
import Animate from 'grommet/components/Animate'
import Columns from 'grommet/components/Columns'
import Image from 'grommet/components/Image'

import IPFSComponent from '../components/IPFSComponent'
import Layout from '../layout'
import Subscribe from '../components/Subscribe'
import i18n from '../i18n'
const t = i18n.t.bind(i18n)
import FontAwesome from '../components/FontAwesome'
import hoc from '../utils/hoc'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect = (selected) =>{
    this.setState({
      ...this.state,
      selected
    })
  }

  render () {
    const imagesUrl = process.env.IMAGES_URL

    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center' texture={`url(${imagesUrl}/bcg4.svg)`} colorIndex='neutral-4'>
          <Box align='center' responsive={true} pad='large'>
            <Heading align='center'>
              <span className='light'>
                PowerPiper
                {/*t('common:welcome')*/}
              </span>
            </Heading>
            <Subscribe />
          </Box>
        </Section>
        <IPFSComponent />
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

export default hoc({}, state => state)(Extended)
