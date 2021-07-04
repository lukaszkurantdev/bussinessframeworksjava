import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg height={2} width={10} viewBox="0 0 10 2" {...props}>
    <Path d="M9.03 1.712H.97a.483.483 0 01-.495-.494C.475.935.687.723.97.723h8.06c.284 0 .496.212.496.495a.483.483 0 01-.495.494z" />
  </Svg>
)

export default SvgComponent
