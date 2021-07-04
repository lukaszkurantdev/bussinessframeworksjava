import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg height={10} width={10} viewBox="0 0 10 10" {...props}>
    <Path
      d="M9.1 4.7H5.6V1.2c0-.3-.2-.5-.5-.5s-.5.2-.5.5v3.5H1.1c-.3 0-.5.2-.5.5s.2.5.5.5h3.5v3.5c0 .3.2.5.5.5s.5-.2.5-.5V5.7h3.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
