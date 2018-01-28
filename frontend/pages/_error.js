import { Component } from 'react'
import Raven from 'raven-js'

import Section from 'grommet/components/Section'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'

import Layout from '../layout'

let logException = (err) => { window && window.console && console.error && console.error(err) } // eslint-disable-line no-unused-expressions
if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.DSN_PUBLIC).install()
}

logException = (err, context) => {
  Raven.captureException(err, {
    extra: context
  })
  window && window.console && console.error && console.error(err) // eslint-disable-line no-unused-expressions
}


class Error extends Component {
  static getInitialProps({ res, ctx, err }) {
    if (!(err instanceof Error)) {
      err = new Error(err && err.message)
    }
    res ? logException(err, ctx) : undefined // eslint-disable-line no-unused-expressions
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return {
      error: statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client',
      statusCode: statusCode
    }
  }

  render() {
    const title = `Error ${(this.props.statusCode || '')}`

    return (
      <Layout {...this.props} title={title}>
        <Section full={true} pad='none' align='center' justify='center'>
          <Heading>
            { title }
          </Heading>
          <Paragraph>
            { this.props.error }
          </Paragraph>
        </Section>
      </Layout>
    )
  }
}

Error.defaultProps = {
  description: '',
  image: '',
  menu: false
}

export default Error
