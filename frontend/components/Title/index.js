import ENV from '../../conf'

const Title = (props) => {
  return (
    <title>{ props.title } | { ENV.SITE_TITLE }</title>
  )
}

export default Title
