import { Component, Fragment } from 'react'
import Router from 'next/router'
import cookie from 'react-cookies'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'

import App from 'grommet/components/App'
import Select from 'grommet/components/Select'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Columns from 'grommet/components/Columns'
import BlogIcon from 'grommet/components/icons/base/Blog'
import Anchor from 'grommet/components/Anchor'
import Responsive from 'grommet/utils/Responsive'

import scss from '../assets/scss/theme.scss'
import nprogress from '../assets/css/progress.css'
import ES from '../components/Flags/es'
import GB from '../components/Flags/gb'
import DE from '../components/Flags/de'
import FR from '../components/Flags/fr'
import KR from '../components/Flags/kr'
import RU from '../components/Flags/ru'
import _Footer from '../components/Footer'
import Meta from '../components/Meta'
import Title from '../components/Title'
import { logPageView } from '../components/GA'
import UserMenu from '../components/UserMenu'
import Logo from '../components/Logo'
import CookiePolicy from '../components/CookiePolicy'
import MainBody from '../components/MainBody'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

//  hacks the problem of invisible first lang.
const options = [
  { value: '', label: '', displayValue: '' },
  { value: 'en', label: <GB label='English' theme='light' />, displayValue: 'English' },
  { value: 'de', label: <DE label='Deutsch' theme='light' />, displayValue: 'Deutsch' },
  { value: 'es', label: <ES label='Español' theme='light' />, displayValue: 'Español' },
  { value: 'fr', label: <FR label='Français' theme='light' />, displayValue: 'Français' },
  { value: 'ko', label: <KR label='한국어' theme='light' />, displayValue: '한국어' },
  { value: 'ru', label: <RU label='Русский' theme='light' />, displayValue: 'Русский' }
]

function getByValue(arr, keyword) {
  const result = arr.filter((o) => { return o.value === keyword })
  return result ? result[0].displayValue : undefined
}

class Layout extends Component {
  constructor(props) {
    super(props)
    this._onLangSelect = this._onLangSelect.bind(this)
    this._onResponsive = this._onResponsive.bind(this)

    this.state = {
      session: undefined,
      currentLang: undefined
    }
  }

  componentWillMount() {
    this.setState({
      //session: cookie.load('sess_id'),
      currentLang: cookie.load('i18next') || undefined
    })
  }

  componentDidMount () {
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

  _onResponsive(small) {
    this.setState({ small })
  }

  _onLangSelect = (e) => {
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
          <Header size='small' direction='row' align='center' float={true} fixed={true} colorIndex='neutral-3'>
            <Logo />
            <Box flex={true} direction='row' responsive={true} pad='none' size='auto'>
              <Columns maxCount={3} justify={alignC} size='small' responsive={true} masonry={masonry}>
                <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto'>
                  {
                    this.props.menu && <UserMenu isAuthenticated={this.props.isAuthenticated} />
                  }
                </Box>
                <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto'>
                  <Link href="/blog/">
                    <Anchor href='/blog/' icon={<BlogIcon />} label='Blog' />
                  </Link>
                </Box>
                { /*this.props.langSelector && <Box align={align} alignContent={alignC} responsive={true} direction={direction} basis ='xsmall' size='auto' colorIndex='neutral-3'>
                  <Select
                    onChange={this._onLangSelect}
                    options={options}
                    value={this.state.currentLang ? getByValue(options, this.state.currentLang) : undefined} />
                </Box>
                */}
              </Columns>
            </Box>
          </Header>
          <CookiePolicy />
          <MainBody>
            { this.props.children }
          </MainBody>
          { logPageView() }
          {_Footer()}
        </App>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  menu: PropTypes.bool.isRequired,
  langSelector: PropTypes.bool.isRequired
}

Layout.defaultProps = {
  menu: true,
  langSelector: true
}

export default Layout
