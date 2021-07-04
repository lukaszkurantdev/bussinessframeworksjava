import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={20} height={5} {...props}>
    <G fill="#000" fillRule="nonzero">
      <Path d="M10 5a2.503 2.503 0 01-2.5-2.5C7.5 1.122 8.622 0 10 0s2.5 1.122 2.5 2.5S11.378 5 10 5zm0-3.75c-.69 0-1.25.56-1.25 1.25S9.31 3.75 10 3.75s1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM2.5 5A2.503 2.503 0 010 2.5C0 1.122 1.122 0 2.5 0S5 1.122 5 2.5 3.878 5 2.5 5zm0-3.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM17.5 5A2.503 2.503 0 0115 2.5C15 1.122 16.122 0 17.5 0S20 1.122 20 2.5 18.878 5 17.5 5zm0-3.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25z" />
    </G>
  </Svg>
)

export default SvgComponent
