import { Component } from 'react'
import jsonp from 'jsonp'
// eslint-disable-next-line
import Form from 'grommet/components/Form'
// eslint-disable-next-line
import Button from 'grommet/components/Button'
// eslint-disable-next-line
import TextInput from 'grommet/components/TextInput'
import Paragraph from 'grommet/components/Paragraph'
import Box from 'grommet/components/Box'
import Responsive from 'grommet/utils/Responsive'

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

export default class Subscribe extends Component {
  constructor(props, ...args) {
    super(props, ...args)
    this.state = {
      status: null,
      msg: null
    }
    this._onResponsive = this._onResponsive.bind(this)
    this.actionURL = '//powerpiper.us17.list-manage.com/subscribe/post?u=0fffbdcc0fda19cf7460e0710&amp;id=61682d65ff'
  }

  async componentDidMount () {
    this.input.focus()
    this._responsive = Responsive.start(this._onResponsive)
  }

  componentWillUnmount () {
    this._responsive.stop()
  }

  _onResponsive(small) {
    this.setState({ small })
  }

  onSubmit = e => {
    e.preventDefault()
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf('@') === -1) {
      this.setState({
        status: 'error'
      })
      return
    }

    const url = getAjaxUrl(this.actionURL) + `&EMAIL=${encodeURIComponent(this.input.value)}`

    this.setState({
      status: 'sending',
      msg: null
    }, () => jsonp(url, {
      param: 'c'
    }, (err, data) => {
      if (err) {
        this.setState({
          status: 'error',
          msg: err
        })
      } else if (data.result !== 'success') {
        this.setState({
          status: 'error',
          msg: data.msg
        })
      } else {
        this.setState({
          status: 'success',
          msg: data.msg
        })
      }
    }))
  }

  render() {
    const inputSize = this.state.small ? 25 : 40

    const { action, messages, styles } = this.props
    const { status, msg } = this.state

    return (
      <Box align='center' alignContent='center' responsive={true}>
        <form action={action} method="post" noValidate>
          <Box align='center' alignContent='center' responsive={true}>
            <input
              ref={node => (this.input = node)}
              type='email'
              defaultValue=''
              name='EMAIL'
              size={inputSize}
              required={true}
              placeholder={messages.inputPlaceholder}
              className='grommetux-text-input grommetux-input' />
            <br />
            <br />
            <button
              disabled={this.state.status === 'sending' || this.state.status === 'success'}
              onClick={this.onSubmit}
              type='submit'
              className='grommetux-button grommetux-button-invert'>
              {messages.btnLabel}
            </button>
          </Box>
          <Paragraph align='center' size='medium' margin='small'>
            {status === 'sending' && <span style={styles.sending} dangerouslySetInnerHTML={{ __html: messages.sending }} />}
            {status === 'success' && <span style={styles.success} dangerouslySetInnerHTML={{ __html: messages.success || msg }} />}
            {status === 'error' && <span style={styles.error} dangerouslySetInnerHTML={{ __html: messages.error || msg }} />}
          </Paragraph>
        </form>
      </Box>
    )
  }
}

Subscribe.defaultProps = {
  messages: {
    btnLabel: 'Subscribe',
    sending: 'Subscribing...',
    success: 'Thank you for subscribing!',
    error: 'Oops, tou should enter your email...',
    inputPlaceholder: 'yourEmail@mail.com'
  },
  styles: {
    sending: { color: 'auto', sifontSizeze: '1em' },
    success: { color: 'green', fontSize: '1em' },
    error: { color: 'red', fontSize: '1em' }
  }
}
