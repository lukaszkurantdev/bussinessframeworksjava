import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={75} height={72} {...props}>
    <Path
      d="M49.088 0L37.499 10.32 25.912 0l-3.366 15.225L7.16 13.75l6.143 14.315L0 36l13.304 7.934L7.161 58.25l15.385-1.474L25.912 72 37.5 61.68 49.088 72l3.365-15.224 15.385 1.474-6.142-14.315L75 36.001l-13.304-7.936 6.142-14.315-15.385 1.475z"
      fill="#FFED00"
      fillRule="evenodd"
    />
  </Svg>
)

export default SvgComponent
