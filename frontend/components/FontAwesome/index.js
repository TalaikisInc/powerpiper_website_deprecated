import PropTypes from 'prop-types'

const FontAwesome = (props) => {
  const theme = props.theme ? props.theme : ''
  return <i className={`fa fa-${props.name} ${props.className} fa-${props.size} ${theme}`} alt={props.ariaLabel} style={{ padding: '0.5em'}} />
}

FontAwesome.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  size: PropTypes.string
}

export default FontAwesome
