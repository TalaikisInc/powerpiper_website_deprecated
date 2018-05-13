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
// import SVGIcon from 'grommet/components/SVGIcon'

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
            {/*<SVGIcon viewBox='0 0 297 210' width='297' height='210' version='1.1' type='logo'>
              <g id='Layer_x0020_1'>
                <path class='fil0' d='M177.791 128.727c1.767,-2.3311 3.6454,-5.3217 4.9433,-8.2125 2.9844,-6.6473 3.1396,-16.2338 1.1179,-23.1553 -1.6293,-5.5779 -4.496,-10.4236 -8.7079,-14.7596 -0.7209,-0.7422 -1.3503,-1.3438 -1.7139,-1.6338 -5.5636,-4.4378 -11.2909,-7.3394 -18.0699,-8.2544 -4.6358,-0.6256 -9.5306,-0.3091 -14.0434,0.9318 -3.821,1.0506 -5.9556,2.3438 -9.2328,4.0924 1.6513,0.1457 10.3738,0.0234 12.7842,0.0234 3.936,0 10.4622,-0.1768 14.0358,1.4728 2.748,1.2685 4.616,2.9894 6.4533,5.0701 1.6609,1.8809 2.6781,3.9257 3.466,6.3444 1.1941,3.6645 1.3483,7.5403 1.1406,11.3626l-0.1417 1.3665c-0.5009,2.7279 -0.9458,4.3047 -1.9258,6.904 -1.2658,2.4089 -2.8569,4.5446 -4.9565,6.3328 -2.866,2.441 -6.7527,3.4525 -10.4582,3.4433l-13.2532 -0.0003 -0.0003 1.1283c0,6.1096 -0.0002,12.2191 -0.0001,18.3287l0.0236 0.4695c0.7196,0.4784 4.3896,1.2465 5.4813,1.4395 4.1548,0.7345 8.5354,0.6343 12.6679,-0.1917 3.6207,-0.7236 7.2017,-2.0751 10.4854,-3.9472 3.8479,-2.1939 7.2877,-5.103 9.9044,-8.5553zm-58.3069 -6.0858l0.0067 -2.9994 -0.0003 -1.8109c0,-3.7467 -0.0001,-7.4934 -0.0001,-11.2402l0.0001 -1.429c0.0661,-1.5914 0.7156,-2.9831 2.2645,-3.6089 1.2061,-0.4872 3.5616,-0.2961 5.0668,-0.2961l17.8587 0c1.0476,0 1.7086,0.0962 2.1107,-0.0637 0.891,-0.3544 0.8247,-3.4337 -0.0724,-3.6631 -0.4202,-0.1074 -28.8901,-0.0307 -29.5681,-0.0306 -0.3782,1.5633 -0.7086,2.9752 -0.9855,4.5672l-0.2234 2.1033c-0.1458,2.0719 -0.1499,3.8972 0.0007,5.7259 0.128,1.555 0.368,3.1124 0.7278,4.8259 0.6548,3.0653 1.5971,5.1384 2.8138,7.9196zm12.2266 13.6999l-0.0006 -1.7731 -0.0005 -1.8471 0 -1.4427 0 -1.4711c0.0003,-2.2246 0.0004,-4.4492 0.0004,-6.6739 0,-2.0807 -0.0006,-4.1614 -0.0003,-6.2422 0.0406,-1.3705 0.0399,-2.0236 0.9499,-3.1198 0.7729,-0.8138 1.6515,-1.2143 2.8057,-1.2358 2.9824,-0.0556 6.474,0.0012 9.4972,0.0012 3.7011,0 10.354,0.763 13.7514,-2.026 3.6303,-2.9802 4.6201,-11.5534 3.0161,-17.3335 -1.9092,-6.8798 -6.5395,-7.8992 -13.1018,-7.8992l-25.1192 0c-0.5066,0.9969 -2.3738,3.4626 -3.1499,4.6766 1.0144,0.0991 14.9069,0.0233 16.332,0.0233 2.1749,0 10.1541,-0.2062 11.9537,0.2706 4.3606,1.1551 6.6799,5.613 6.2269,9.9525 -0.4625,4.4308 -3.4519,8.444 -8.1213,8.5746 -2.481,0.0693 -5.9084,0.0004 -8.4614,0.0004l-11.2792 0 -0.0001 1.3866 -0.0004 1.3958c-0.0005,6.9242 -0.2609,14.3246 0.0713,21.1863 0.5843,0.8522 3.7046,2.9626 4.6301,3.5965z'/>
              </g>
            </SVGIcon>*/}
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
  title: 'PowerPiper',
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
