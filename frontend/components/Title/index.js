const siteTitle = process.env.SITE_TITLE || 'PowerPiper'

const Title = (props) => {
  return (
    <title>{ props.title } | { siteTitle }</title>
  )
}

export default Title
