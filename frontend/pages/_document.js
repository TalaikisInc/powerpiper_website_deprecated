import Document, { Head, Main, NextScript } from 'next/document'
import cookie from 'react-cookies'

import Session from '../components/Session'

export default class CustomDocument extends Document {
  static async getInitialProps({ renderPage, req }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const session = await Session.getSession({ req })
    cookie.save('sess_id', session.csrfToken, { path: '/' })
    const lang = req.i18n ? req.i18n.language : 'en'
    return { html, head, errorHtml, chunks, session, lang }
  }

  render() {
    return (
      <html lang={this.props.lang}>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
