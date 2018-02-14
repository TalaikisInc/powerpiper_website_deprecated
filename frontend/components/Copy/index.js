import ENV from '../../conf'

const Copy = () => {
  return (
    <div className="light">&copy; {(new Date().getFullYear())}
      <span dangerouslySetInnerHTML={{ __html: ` ${ENV.SITE_TITLE} | <a href='/privacy_policy/'>Privacy Policy</a> | <a href='/cookie_policy/'>Cookie Policy</a>`}} />
    </div>
  )
}

export default Copy
