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

import PowerUsage from '../components/PowerUsage'
import TxCosts from '../components/TxCosts'
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

  render () {
    const imagesUrl = process.env.IMAGES_URL

    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center' texture={`url(${imagesUrl}/bcg4.svg)`} colorIndex='neutral-4'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true}>
            <Box align='center' responsive={true} pad='large'>
              <Heading align='center'>
                <span className='light'>
                  {t('common:welcome')}
                </span>
              </Heading>
              <Subscribe />
            </Box>
          </Animate>
        </Section>
        <Section full={true} pad='none' align='center' justify='center' colorIndex='neutral-2'>
          <Box align='center' responsive={true} pad='large'>
            <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
              {FontAwesome({name: 'plug', theme: 'dark', size: '4x'})}
              <Heading align='center'>
                <span className='dark'>
                  {t('common:intro_title')}
                </span>
              </Heading>
            </Animate>
            <Animate enter={{ animation: 'slide-down', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
              <Box align='center' responsive={true} direction='row'>
                <Box pad='medium' size='large'>
                  <TxCosts />
                </Box>
                <Box pad='medium' size='large' responsive={true}>
                  <Label>
                    <span className='dark'>
                      {t('common:intro_1')}
                    </span>
                  </Label>
                  <Label>
                    <span className='dark'>
                      {t('common:intro_2')}
                    </span>
                  </Label>
                </Box>
              </Box>
            </Animate>
            <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
              <Box align='center' responsive={true} direction='row'>
                <Box pad='medium' size='large' responsive={true}>
                  <Label>
                    <span className='dark'>
                      {t('common:intro_3')}
                    </span>
                  </Label>
                </Box>
                <Box pad='medium' size='large' responsive={true}>
                <PowerUsage />
                </Box>
              </Box>
            </Animate>
          </Box>
        </Section>
        <Section full={true} pad='medium' align='center' justify='center' texture={`url(${imagesUrl}/bcg4.svg)`} colorIndex='neutral-4'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true} pad='medium'>
              {FontAwesome({name: 'battery-full', theme: 'light', size: '4x'})}
              <Heading align='center'>
                <span className='light'>
                  {t('common:about_title')}
                </span>
              </Heading>
              <Box align='center' responsive={true} direction='row'>
                <Box align='center' pad='medium' size='large'>
                  <Image size='large' src={`${imagesUrl}/about.png`} />
                </Box>
                <Box align='center' pad='medium' size='large'>
                  <Label>
                    <span className='light'>
                      {t('common:about_1')}
                    </span>
                  </Label>
                  <Label>
                    <span className='light'>
                      {t('common:about_2')}
                    </span>
                  </Label>
                </Box>
              </Box>
              <Box align='center' responsive={true}>
                <Label>
                  <span className='light'>
                    {t('common:about_3')}
                  </span>
                </Label>
              </Box>
            </Box>
          </Animate>
        </Section>
        <Section full={true} pad='none' align='center' justify='center' colorIndex='neutral-2'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true} pad='medium'>
              {FontAwesome({name: 'users', theme: 'dark', size: '4x'})}
              <Heading align='center'>
                <span className='dark'>
                  {t('common:team_title')}
                </span>
              </Heading>
            </Box>
          </Animate>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true} direction='row'>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_1')}
                  </span>
                </Label>
                <Image size='small' src={`${imagesUrl}/Giedrecircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_1')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/giedre-garbinciute-b008213a/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_2')}
                  </span>
                </Label>
                <Image size='small' src={`${imagesUrl}/Mantascircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_2')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/mantas-rukui%C5%BEa-136a84139/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  <span className='dark'>
                    {t('common:team_title_3')}
                  </span>
                </Label>
                <Image size='small' src={`${imagesUrl}/Tadascircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  <span className='dark'>
                    {t('common:team_3')}
                  </span>
                </Paragraph>
                <Paragraph size='small' margin='small' align='end'>
                  <a href='https://www.linkedin.com/in/xenu255/'>
                    {FontAwesome({name: 'linkedin', theme:'dark', size: '1x'})}
                  </a>
                  &nbsp;
                  <a href='https://talaikis.com'>
                    {FontAwesome({name: 'external-link', theme:'dark', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
            </Box>
          </Animate>
        </Section>
      </Layout>
    )
  }

  _onSelect(selected) {
    this.setState({
      ...this.state,
      selected
    })
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
