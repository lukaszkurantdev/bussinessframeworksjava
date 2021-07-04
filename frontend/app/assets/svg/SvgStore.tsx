import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg width={18} height={21} viewBox="0 0 18 21" {...props}>
    <Path d="M9 1C4.6 1 1 4.6 1 9c0 .5 0 1 .1 1.5 0 0 0 .1.1.3.1.5.3 1.1.5 1.6.9 2 2.8 5.2 6.9 8.5.1 0 .3.1.4.1s.3 0 .4-.1c4.2-3.3 6.1-6.5 6.9-8.5.2-.5.4-1 .5-1.6 0-.2.1-.2.1-.3.1-.5.1-1 .1-1.5 0-4.4-3.6-8-8-8zM2.2 9c0-3.8 3.1-6.8 6.8-6.8 3.8 0 6.8 3.1 6.8 6.8 0 .4 0 .9-.1 1.3v.2c-.1.5-.3.9-.5 1.3-.8 1.8-2.5 4.6-6.2 7.7-3.7-3.1-5.4-5.9-6.2-7.7-.2-.4-.3-.9-.5-1.3v-.2c-.1-.4-.1-.9-.1-1.3z" />
    <Path d="M9 14.2c2.8 0 5.1-2.3 5.1-5.1S11.8 4 9 4 3.9 6.3 3.9 9.1s2.3 5.1 5.1 5.1zM5.1 9.1C5.1 7 6.8 5.2 9 5.2s3.9 1.7 3.9 3.9S11.1 13 9 13s-3.9-1.8-3.9-3.9z" />
  </Svg>
)

export default SvgComponent
