import { Component, Fragment } from 'react'
import Router from 'next/router'
import cookie from 'react-cookies'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

import scss from '../assets/scss/theme.scss'
import nprogress from '../assets/css/progress.css'
import App from 'grommet/components/App'
import Select from 'grommet/components/Select'
import Article from 'grommet/components/Article'
import Layer from 'grommet/components/Layer'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import Header from 'grommet/components/Header'
// import SVGIcon from 'grommet/components/SVGIcon'
import Columns from 'grommet/components/Columns'
import Heading from 'grommet/components/Heading'
import BlogIcon from 'grommet/components/icons/base/Blog'
import ContactInfoIcon from 'grommet/components/icons/base/ContactInfo'
import LoginIcon from 'grommet/components/icons/base/Login'
import Button from 'grommet/components/Button'
import Animate from 'grommet/components/Animate'
import Section from 'grommet/components/Section'
import Anchor from 'grommet/components/Anchor'
import NProgress from 'nprogress'
import Responsive from 'grommet/utils/Responsive'

import ES from '../components/Flags/es'
import GB from '../components/Flags/gb'
import DE from '../components/Flags/de'
import FR from '../components/Flags/fr'
import KR from '../components/Flags/kr'
import RU from '../components/Flags/ru'
import _Footer from '../components/Footer'
import Meta from '../components/Meta'
import Title from '../components/Title'
import { initGA, logPageView } from '../components/GA'
import Signin from '../components/Signin'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

//  hacks the problem of invisible first lang.
const options = [
  { value: '', label: '', displayValue: '' },
  { value: 'en', label: <GB label='English' />, displayValue: 'English' },
  { value: 'de', label: <DE label='Deutsch' />, displayValue: 'Deutsch' },
  { value: 'es', label: <ES label='Español' />, displayValue: 'Español' },
  { value: 'fr', label: <FR label='Français' />, displayValue: 'Français' },
  { value: 'ko', label: <KR label='한국어' />, displayValue: '한국어' },
  { value: 'ru', label: <RU label='Русский' />, displayValue: 'Русский' }
]

function getByValue(arr, keyword) {
  const result = arr.filter((o) => { return o.value === keyword })
  return result ? result[0].displayValue : undefined
}

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.onLangSelect = this.onLangSelect.bind(this)
    this._onResponsive = this._onResponsive.bind(this)

    this.state = {
      modal: undefined,
      session: undefined,
      policy: false,
      keep: true,
      currentLang: undefined
    }
  }

  componentWillMount() {
    this.setState({
      policy: cookie.load('cookie-policy'),
      session: cookie.load('sess_id'),
      keep: true,
      currentLang: cookie.load('i18next') || undefined
    })
  }

  async componentDidMount () {
    if (!window.GA_INITIALIZED && window.location.pathname && this.state.policy) {
      initGA(this.props.documentPath)
      window.GA_INITIALIZED = true
    }

    if (this.state.modal !== true) {
      cookie.save('redirect_url', window.location.pathname, { path: '/' })
    }

    this._responsive = Responsive.start(this._onResponsive)
  }

  async componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive)
  }

  componentWillUnmount () {
    this._responsive.stop()
  }

  onOpenModal() {
    this.setState({ modal: true })
  }

  _onResponsive(small) {
    this.setState({ small })
  }

  onCloseModal () {
    this.setState({ modal: false })
  }

  onButtonClick = () => {
    this.setState({
      policy: true,
      keep: false
    })
    cookie.save('cookie-policy', this.state.policy, { path: '/' })
  }

  onLangSelect(e) {
    this.setState({ currentLang: e.option.value })
    cookie.save('i18next', e.option.value, { path: '/' })
    Router.push('/?lang=' + e.option.value)
    window.location.reload()
  }

  render () {
    const { masonry, alignC, align, pad, direction } = this.state.small ? {
      masonry: true,
      direction: 'column',
      alignC: 'center',
      align: 'end',
      pad: 'large' } : {
      masonry: false,
      direction: 'row',
      alignC: 'end',
      align: 'center',
      pad: 'small' }

    return (
      <Fragment>
        <Head>
          {Title({ title: this.props.title })}
          {Meta({ ...this.props })}
          <link rel='canonical' href={this.props.baseURL} />
          <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css' />
          <style dangerouslySetInnerHTML={{ __html: nprogress }} />
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
        <App centered={false}>
          <Article responsive={true} margin='none' flex={false} primary={true}>
            <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 300 }} keep={true}>
              <Header size='small' fixed={true} direction='row' align='center'>
                <Box pad={pad} size='auto' responsive={true}>
                  <Link href="/">
                    <Label>Home</Label>
                  </Link>
                </Box>
                <Box flex={true} direction='row' responsive={true} pad={pad} size='auto'>
                  <Columns maxCount={3} justify={alignC} size='small' responsive={true} masonry={masonry}>
                    <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto'>
                      {
                        this.props.menu && <div>
                          <UserMenu session={this.state.session} onOpenModal={this.onOpenModal} />
                          <SigninModal modal={this.state.modal} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal} session={this.state.session} />
                        </div>
                      }
                    </Box>
                    <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto'>
                      <Link prefetch href="/blog/">
                        <Anchor href='/blog/' icon={<BlogIcon />} label='Blog' />
                      </Link>
                    </Box>
                    { this.props.langSelector && <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto'>
                      <Select
                        onChange={this.onLangSelect}
                        options={options}
                        value={this.state.currentLang ? getByValue(options, this.state.currentLang) : undefined} />
                    </Box>
                    }
                  </Columns>
                </Box>
              </Header>
            </Animate>
            {
              !this.state.policy && <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 400 }} keep={this.state.keep}>
                <Section pad='small' align='center' justify='center'>
                  <Label>
                    This site uses cookies. Click 'OK' if that's OK with you. You can also familiarize yourself with our <a href='/cookie_policy/'>Cookie Policy</a> or <a href='/privacy_policy/'>Privacy Policy</a>.
                  </Label>
                  <Button critical={true} label='OK' onClick={this.onButtonClick} />
                </Section>
              </Animate>
            }
            <MainBody>
              { this.props.children }
            </MainBody>
            { logPageView() }
            {_Footer()}
          </Article>
        </App>
      </Fragment>
    )
  }
}

// eslint-disable-next-line
export class MainBody extends Component {
  render() {
    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }
}

// eslint-disable-next-line
export class UserMenu extends Component {
  render() {
    if (this.props.session && this.props.session.user) {
      const session = this.props.session
      return (
        <Link href="/account/">
          <Anchor href='/account/' icon={<ContactInfoIcon />} label={session.user.name || session.user.email} />
        </Link>
      )
    } else {
      return (
        <Anchor icon={<LoginIcon />} label='Sign In' onClick={this.props.onOpenModal} />
      )
    }
  }
}

// eslint-disable-next-line
export class SigninModal extends Component {
  render() {
    return (
      <div>
        { this.props.modal && <Layer flush={true} closer={true} onClose={this.props.onCloseModal} align='center'>
          <Box pad='medium' responsive={true}>
            <Heading>
              Sign In / Sign Up
            </Heading>
            <Signin session={this.props.session} />
          </Box>
        </Layer>
        }
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  menu: PropTypes.bool.isRequired
}

Layout.defaultProps = {
  menu: true,
  langSelector: true
}
