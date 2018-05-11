import { Component } from 'react'
import IPFS from 'ipfs-mini'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

export default class IPFSComponent extends Component {
  constructor(props, ...args) {
    super(props, ...args)

    this.state = {
      hash: null,
      loading: false,
      data: null
    }

    this._onSubmit = this._onSubmit.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  _onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      loading: true
    })

    if (this.state.hash !== '' && this.state.has !== null) {
      ipfs.catJSON(this.state.hash, async (err, data) => {
        if (!err) {
          this.setState({
            data: data
          })
        }
      })
    }

    this.setState({
      loading: false
    })
  }

  _onChange = (event) => {
    const value = event.target.value ? event.target.value : ''
    
    this.setState({
      [event.target.name]: value
    })
  }

  render () {
    return (
      <Box align='center' responsive={true} pad='large' colorIndex='neutral-4'>
        <Box align='center'>
          <Heading align='center'>
          View our one-pager:
          </Heading>
        </Box>
        <Form onSubmit={this._onSubmit}>
          <Box align='center' pad='large'>
            <TextInput
              type='text'
              name='hash'
              onDOMChange={this._onChange}
              value={this.state.hash}
              placeHolder='(enter hash key)' />
          </Box>
          <Box align='center' pad='large'>
          {
            this.state.loading ? 'Loading...'
            : <Button type='submit' label='Go' />
          }
          </Box>
        </Form>
        { this.state.data ? <Image src={this.state.data} size='large' align="center" /> : '' }
        </Box>
      
    )
  }
}
