import SVGIcon from 'grommet/components/SVGIcon'

import Wrapper from './wrapper'

const DE = (props) => {
  return (
    <Wrapper>
      <SVGIcon viewBox='0 0 5 3' width="100" height="60" version='1.1' type='logo' a11yTitle={props.label}>
        <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/>
        <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/>
        <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/>
      </SVGIcon>
        &nbsp;{ props.label }
    </Wrapper>
  )
}

export default DE
