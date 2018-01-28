import PropTypes from 'prop-types'

const siteTitle = process.env.SITE_TITLE
const baseUrl = process.env.BASE_URL

const Meta = (props) => {

  return (
    <div>
      <meta charSet='utf-8' />
      <meta name='title' content={props.title} />
      <meta name='description' content={props.description} />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge, chrome=1' />
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
      <meta name="author" content={siteTitle} />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta property='og:site_name' content={siteTitle} />
      <meta property='og:title' content={props.title} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={baseUrl} />
      <meta property='og:image' content={props.image} />
      <meta name='twitter:site' content='@ThePowerPiper' />
      <link rel='icon' type='image/png' href='/assets/img/favicon.png' />
      <script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
    </div>
  )
}

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default Meta
