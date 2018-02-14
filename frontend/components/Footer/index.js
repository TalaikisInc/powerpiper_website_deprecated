import PropTypes from 'prop-types'
import Footer from 'grommet/components/Footer'
import Animate from 'grommet/components/Animate'

import FontAwesome from '../FontAwesome'
import Wrapper from './wrapper'
import Copy from '../Copy'

const _Footer = (props) => {
  return (
    <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 300 }} keep={true} visible='scroll'>
      <Footer primary={true} appCentered={true} direction="column" align="center" pad="medium" colorIndex="neutral-3">
        <Wrapper>
          <a href='//www.linkedin.com/company/power-piper/'>{FontAwesome({name: 'linkedin', theme: 'light', ariaLabel: 'Linkedin', size: '2x'})}</a>
          <a href='//t.me/joinchat/HTo8RBG9CLABNn3hZiIrig'>{FontAwesome({name: 'telegram', theme: 'light', ariaLabel: 'Telegram', size: '2x'})}</a>
          <a href='//github.com/powerpiper'>{FontAwesome({name: 'github', ariaLabel: 'Github', theme: 'light', size: '2x'})}</a>
          <a href='//plus.google.com/u/1/109642331145101222195'>{FontAwesome({name: 'google-plus', theme: 'light', ariaLabel: 'Google+', size: '2x'})}</a>
          <a href='//www.facebook.com/powerpiper/'>{FontAwesome({name: 'facebook', ariaLabel: 'Facebook', theme: 'light', size: '2x'})}</a>
          <a href='//twitter.com/ThePowerPiper'>{FontAwesome({name: 'twitter', ariaLabel: 'Twitter', theme: 'light', size:'2x'})}</a>
          <a href='//www.instagram.com/realpowerpiper/'>{FontAwesome({name: 'instagram', theme: 'light', ariaLabel: 'Instagram', size:'2x'})}</a>
          <a href='//medium.com/power-piper'>{FontAwesome({name: 'medium', ariaLabel: 'Medium', theme: 'light', size:'2x'})}</a>
          <a href='//www.reddit.com/user/powerpiper'>{FontAwesome({name: 'reddit', theme: 'light', ariaLabel: 'Reddit', size: '2x'})}</a>
          <a href='#'>{FontAwesome({name: 'btc', ariaLabel: 'Bitcoin Talk', theme: 'light', size: '2x'})}</a>
          <a href='//www.youtube.com/channel/UCJ1NtquKbzr0Naw31aiIzyg'>{FontAwesome({name: 'youtube', theme: 'light', ariaLabel: 'Youtube', size: '2x'})}</a>
          {Copy()}
        </Wrapper>
      </Footer>
    </Animate>
  )
}

_Footer.propTypes = {
  title: PropTypes.string.isRequired
}

export default _Footer
