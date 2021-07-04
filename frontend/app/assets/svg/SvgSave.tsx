import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={14} height={16} {...props}>
    <Path
      d="M1.195 1h12v14l-6-6.462-6 6.462z"
      stroke="#000"
      strokeWidth={1.2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
