import SVGIcon from 'grommet/components/SVGIcon'

import Wrapper from './wrapper'

// TODO, dimensions and JSX errors
const KR = (props) => {
  return (
    <Wrapper>
      <SVGIcon viewBox='-36 -24 72 48' width="100" height="60" version='1.1' type='logo' a11yTitle={props.label}>
        <rect fill="#fff" x="-36" y="-24" width="72" height="48"/>
        <g transform="rotate(-56.3099325)">
          <g id="b2"><path id="b" d="M-6-25H6M-6-22H6M-6-19H6" stroke="#000" strokeWidth="2"/>
            <use xlinkHref="#b" y="44"/>
          </g>
          <path stroke="#fff" strokeWidth="1" d="M0,17v10"/>
          <circle fill="#c60c30" r="12"/>
          <path fill="#003478" d="M0-12A6,6 0 0 0 0,0A6,6 0 0 1 0,12A12,12 0 0,1 0-12Z"/>
        </g>
        <g transform="rotate(-123.6900675)">
          <use xlinkHref="#b2"/>
          <path stroke="#fff" strokeWidth="1" d="M0-23.5v3M0,17v3.5M0,23.5v3"/>
        </g>
      </SVGIcon>
        &nbsp;{ props.label }
    </Wrapper>
  )
}

export default KR
