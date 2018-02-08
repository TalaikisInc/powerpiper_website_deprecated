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
import H1Wrapper from '../components/TextWrapper/h1'

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
    const imagesUrl = process.env.IMAGES_URL

    return (
      <Layout {...this.props}>
        <Section full={true} pad='none' align='center' justify='center' texture={`url(${imagesUrl}/bcg2.svg)`}>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true}>
            <Box align='center' responsive={true}>
              <H1Wrapper color='#fff'>
                <Heading align='center'>
                  {t('common:welcome')}
                </Heading>
              </H1Wrapper>
              <Subscribe />
            </Box>
          </Animate>
        </Section>
        <Section full={true} pad='medium' align='center' justify='center'>
          <Animate enter={{ animation: 'slide-up', duration: 400, delay: 300 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true}>
              {FontAwesome({name: 'plug', size: '4x'})}
              <Heading align='center'>
                  {t('common:intro_title')}
              </Heading>
              <Box align='center' responsive={true} direction='row'>
                <Box pad='medium' size='large'>
                  <TxCosts />
                </Box>
                <Box pad='medium' size='large'>
                  <Label>
                    {t('common:intro_1')}
                  </Label>
                </Box>
              </Box>
              <Box align='center' responsive={true} direction='row'>
                <Box pad='medium' size='large'>
                <Label>
                    {t('common:intro_2')}
                  </Label>
                </Box>
                <Box pad='medium' size='large'>
                <PowerUsage />
                </Box>
              </Box>
            </Box>
          </Animate>
        </Section>
        <Section full={true} pad='medium' align='center' justify='center'>
          <Animate enter={{ animation: 'slide-up', duration: 400, delay: 300 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true}>
            {FontAwesome({name: 'battery-full', size: '4x'})}
            <Heading align='center'>
              {t('common:about_title')}
            </Heading>
            <Label>
              {t('common:about_1')}
            </Label>
            <Label>
              {t('common:about_2')}
            </Label>
            <Label>
              {t('common:about_3')}
            </Label>
            </Box>
          </Animate>
        </Section>
        <Section full={true} pad='medium' align='center' justify='center'>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true}>
              {FontAwesome({name: 'users', size: '4x'})}
              <Heading align='center'>
                {t('common:team_title')}
              </Heading>
            </Box>
          </Animate>
          <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 1000 }} keep={true} visible='scroll'>
            <Box align='center' responsive={true} direction='row'>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  {t('common:team_title_1')}
                </Label>
                <Image size='small' src={`${imagesUrl}/Giedrecircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  {t('common:team_1')}
                </Paragraph>
                <Paragraph size='small' margin='small' align='left'>
                  <a href='https://www.linkedin.com/in/giedre-garbinciute-b008213a/'>
                    {FontAwesome({name: 'linkedin', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  {t('common:team_title_2')}
                </Label>
                <Image size='small' src={`${imagesUrl}/Mantascircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  {t('common:team_2')}
                </Paragraph>
                <Paragraph size='small' margin='small' align='left'>
                  <a href='https://www.linkedin.com/in/mantas-rukui%C5%BEa-136a84139/'>
                    {FontAwesome({name: 'linkedin', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
              <Box pad='medium' align='center' justify='start'>
                <Label uppercase={true} align='center'>
                  {t('common:team_title_3')}
                </Label>
                <Image size='small' src={`${imagesUrl}/Tadascircle.png`} />
                <Paragraph size='large' margin='small' align='center'>
                  {t('common:team_3')}
                </Paragraph>
                <Paragraph size='small' margin='small'>
                  <a href='https://www.linkedin.com/in/xenu255/'>
                    {FontAwesome({name: 'linkedin', size: '1x'})}
                  </a>
                  &nbsp;
                  <a href='https://talaikis.com'>
                    {FontAwesome({name: 'external-link-alt', size: '1x'})}
                  </a>
                </Paragraph>
              </Box>
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
