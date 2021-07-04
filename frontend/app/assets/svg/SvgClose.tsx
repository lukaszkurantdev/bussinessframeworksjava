import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const SvgComponent = (props: any) => (
  <Svg width={10} height={9} {...props}>
    <G stroke={props.color || "#FFF"} fill="none" fillRule="evenodd" strokeLinecap="round">
      <Path d="M.757.257l8.486 8.486M9.243.257L.757 8.743" />
    </G>
  </Svg>
)

export default SvgComponent
