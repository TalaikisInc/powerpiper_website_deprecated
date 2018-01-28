import PropTypes from 'prop-types'
import Footer from 'grommet/components/Footer'
import Animate from 'grommet/components/Animate'

import FontAwesome from '../FontAwesome'
import A from '../A'
import Wrapper from './wrapper'
import Copy from '../Copy'

const _Footer = (props) => {
  return (
    <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 300 }} keep={true} visible='scroll'>
      <Footer primary={true} appCentered={true} direction="column" align="center" pad="medium" colorIndex="grey-1">
        <Wrapper>
          <A href='//www.linkedin.com/company/power-piper/'>{FontAwesome({name: 'linkedin', ariaLabel: 'Linkedin', size: '2x'})}</A>
          <A href='//t.me/joinchat/HTo8RBG9CLABNn3hZiIrig'>{FontAwesome({name: 'telegram', ariaLabel: 'Telegram', size: '2x'})}</A>
          <A href='//github.com/powerpiper'>{FontAwesome({name: 'github', ariaLabel: 'Github', size: '2x'})}</A>
          <A href='//plus.google.com/u/1/109642331145101222195'>{FontAwesome({name: 'google-plus', ariaLabel: 'Google+', size: '2x'})}</A>
          <A href='//www.facebook.com/powerpiper/'>{FontAwesome({name: 'facebook', ariaLabel: 'Facebook', size: '2x'})}</A>
          <A href='//twitter.com/ThePowerPiper'>{FontAwesome({name: 'twitter', ariaLabel: 'Twitter', size:'2x'})}</A>
          <A href='//www.instagram.com/realpowerpiper/'>{FontAwesome({name: 'instagram', ariaLabel: 'Instagram', size:'2x'})}</A>
          <A href='//medium.com/power-piper'>{FontAwesome({name: 'medium', ariaLabel: 'Medium', size:'2x'})}</A>
          <A href='//www.reddit.com/user/powerpiper'>{FontAwesome({name: 'reddit', ariaLabel: 'Reddit', size: '2x'})}</A>
          <A href='#'>{FontAwesome({name: 'btc', ariaLabel: 'Bitcoin Talk', size: '2x'})}</A>
          <A href='//www.youtube.com/channel/UCJ1NtquKbzr0Naw31aiIzyg'>{FontAwesome({name: 'youtube', ariaLabel: 'Youtube', size: '2x'})}</A>
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
