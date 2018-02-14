import { Component } from 'react'
import cookie from 'react-cookies'

import Section from 'grommet/components/Section'
import Label from 'grommet/components/Label'
import Button from 'grommet/components/Button'
import Animate from 'grommet/components/Animate'

import { initGA } from '../GA'

class CookiePolicy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      policy: false,
      keep: true
    }
  }

  _onButtonClick = () => {
    this.setState({
      policy: true,
      keep: false
    })
    cookie.save('cookie-policy', this.state.policy, { path: '/' })
  }

  componentWillMount() {
    this.setState({
      policy: cookie.load('cookie-policy'),
      keep: true
    })
  }

  componentDidMount () {
    if (!window.GA_INITIALIZED && window.location.pathname && this.state.policy) {
      initGA(this.props.documentPath)
      window.GA_INITIALIZED = true
    }
  }

  render () {
    if(!this.state.policy) {
    return (
        <Animate enter={{ animation: 'slide-down', duration: 1000, delay: 600 }} keep={this.state.keep}>
            <Section pad='large' align='center' justify='center' colorIndex='neutral-4'>
            {/* this one is added to allow for second section to become visible */}
            </Section>
            <Section pad='large' align='center' justify='center' colorIndex='neutral-4'>
                <Label>
                    <span className="light">
                        This site uses cookies. Click 'OK' if that's OK with you. You can also familiarize yourself with our <a href='/cookie_policy/'>Cookie Policy</a> or <a href='/privacy_policy/'>Privacy Policy</a>.
                    </span>
                </Label>
                <Button critical={true} label='OK' onClick={this._onButtonClick} />
            </Section>
        </Animate>
        )
    } else {
        return <span />
    }
  }
}

export default CookiePolicy
