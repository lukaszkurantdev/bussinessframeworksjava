import React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={16} height={16} {...props}>
    <G transform="translate(1 1)" stroke="#000" fill="none" fillRule="evenodd">
      <Circle cx={12} cy={2} r={2} />
      <Circle cx={12} cy={12} r={2} />
      <Circle cx={2} cy={7} r={2} />
      <Path d="M4 5.928l6-3.157M4 7.772l6 3.157" />
    </G>
  </Svg>
)

export default SvgComponent
