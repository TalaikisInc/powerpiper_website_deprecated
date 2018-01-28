import SVGIcon from 'grommet/components/SVGIcon'

import Wrapper from './wrapper'

const FR = (props) => {
  return (
    <Wrapper>
      <SVGIcon viewBox='0 0 3 2' width="100" height="60" version='1.1' type='logo' a11yTitle={props.label}>
        <rect width="3" height="2" fill="#ED2939"/>
        <rect width="2" height="2" fill="#fff"/>
        <rect width="1" height="2" fill="#002395"/>
      </SVGIcon>
        &nbsp;{ props.label }
    </Wrapper>
  )
}

export default FR
