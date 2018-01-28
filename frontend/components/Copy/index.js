import A from '../A'

const siteTitle = process.env.SITE_TITLE

const Copy = () => {
  return (
    <div>&copy; {(new Date().getFullYear())}
      <span dangerouslySetInnerHTML={{ __html: ` ${siteTitle} | <A href='/privacy_policy/'>Privacy Policy</A> | <A href='/cookie_policy/'>Cookie Policy</A>`}} />
    </div>
  )
}

export default Copy
