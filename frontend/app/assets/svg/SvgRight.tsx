import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg height={12} width={8} viewBox="0 0 8 12" {...props}>
    <Path d="M7.2 5.6L1.8.3c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l5 5-5 5c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l5.4-5.4V6c0-.1 0-.3-.1-.4z" />
  </Svg>
)

export default SvgComponent
