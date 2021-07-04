import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg width={6} height={21} {...props}>
    <G fill="#9D9D9C" fillRule="nonzero">
      <Path d="M.5 10.5C.5 9.122 1.622 8 3 8s2.5 1.122 2.5 2.5S4.378 13 3 13a2.503 2.503 0 01-2.5-2.5zm3.75 0c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25.56 1.25 1.25 1.25 1.25-.56 1.25-1.25zM.5 3C.5 1.622 1.622.5 3 .5S5.5 1.622 5.5 3 4.378 5.5 3 5.5A2.503 2.503 0 01.5 3zm3.75 0c0-.69-.56-1.25-1.25-1.25S1.75 2.31 1.75 3 2.31 4.25 3 4.25 4.25 3.69 4.25 3zM.5 18c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5A2.503 2.503 0 01.5 18zm3.75 0c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25.56 1.25 1.25 1.25 1.25-.56 1.25-1.25z" />
    </G>
  </Svg>
)

export default SvgComponent
