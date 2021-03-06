import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={18} height={18} {...props}>
    <Path
      d="M17.293 13.548c-1.618-1.407-3.116-3.391-3.116-8.345C14.177 2.334 11.855 0 9 0 6.145 0 3.823 2.334 3.823 5.203c0 4.959-1.497 6.94-3.116 8.346A2.065 2.065 0 000 15.102a.59.59 0 00.589.592h5.589A2.892 2.892 0 009 18c1.388 0 2.55-.991 2.822-2.306h5.59a.59.59 0 00.588-.592c0-.599-.258-1.166-.707-1.554zM9 16.816c-.733 0-1.36-.468-1.6-1.122h3.2A1.709 1.709 0 019 16.816zM1.41 14.51a.87.87 0 01.068-.067C3.948 12.301 5 9.537 5 5.203c0-2.216 1.795-4.02 4-4.02s4 1.804 4 4.02c0 4.33 1.053 7.094 3.523 9.24.024.022.047.044.068.067H1.41z"
      fill={props.color}
      fillRule="nonzero"
    />
  </Svg>
)

export default SvgComponent
