import SVGIcon from 'grommet/components/SVGIcon'

import Wrapper from './wrapper'

const RU = (props) => {
  const theme = props.theme

  return (
    <Wrapper theme={theme}>
      <SVGIcon viewBox='0 0 9 6' width="100" height="60" version='1.1' type='logo' a11yTitle={props.label}>
        <rect fill="#fff" width="9" height="3"/>
        <rect fill="#d52b1e" y="3" width="9" height="3"/>
        <rect fill="#0039a6" y="2" width="9" height="2"/>
      </SVGIcon>
      <span className={theme}>
        &nbsp;{ props.label }
      </span>
    </Wrapper>
  )
}

export default RU
