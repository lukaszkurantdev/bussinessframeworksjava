import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent =(props: any) => (
  <Svg width={19} height={19} {...props}>
    <G fill="#000" fillRule="nonzero">
      <Path d="M18.728 7.906L9.927.192a.647.647 0 00-.854 0l-8.8 7.714a.647.647 0 00.852.973l.682-.597v9.625c0 .357.29.647.647.647H16.546c.357 0 .647-.29.647-.647V8.282l.681.597a.645.645 0 00.914-.06.647.647 0 00-.06-.913zM8.006 17.26v-5.331h2.988v5.331H8.006zm7.893-10.107V17.26h-3.61v-5.978a.647.647 0 00-.647-.647H7.359a.647.647 0 00-.648.647v5.978h-3.61V7.153v-.005L9.5 1.539l6.4 5.609-.001.005z" />
      <Path d="M8.05 6.095c0 .358.29.648.648.648h1.604a.647.647 0 000-1.295H8.698a.647.647 0 00-.648.647z" />
    </G>
  </Svg>
)

export default SvgComponent
