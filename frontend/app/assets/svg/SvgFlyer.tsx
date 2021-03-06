import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg width={19} height={18} viewBox="0 0 19 18" {...props}>
    <Path d="M17.9 2.4c-.1-.1-.2-.2-.4-.2-.3 0-.5.2-.5.5v11.7c0 1.2-1 2.2-2.2 2.2H4.1c-1.2 0-2.2-1-2.2-2.2V2h12.7v11.2c0 .3.2.5.5.5s.5-.2.5-.5V1.5c0-.3-.2-.5-.5-.5H1.4c-.3 0-.5.2-.5.5v13c0 1.8 1.4 3.2 3.2 3.2h10.7c1.8 0 3.2-1.4 3.2-3.2V2.8c0-.1 0-.3-.1-.4z" />
    <Path d="M3.5 4.5h9.6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H3.5c-.3 0-.5.2-.5.5s.2.5.5.5zM3.5 13.5h9.6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H3.5c-.3 0-.5.2-.5.5s.2.5.5.5zM2.8 10.7c0 .3.2.5.5.5h4.8c.3 0 .5-.2.5-.5V6c0-.3-.2-.5-.5-.5H3.3c-.3-.1-.5.2-.5.5v4.7zm1-.5V6.5h3.7v3.7H3.8zM13.3 5.9h-3.2c-.3 0-.5.2-.5.5s.2.5.5.5h3.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM13.3 7.9h-3.2c-.3 0-.5.2-.5.5s.2.5.5.5h3.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM13.8 10.5c0-.3-.2-.5-.5-.5h-3.2c-.3 0-.5.2-.5.5s.2.5.5.5h3.2c.3 0 .5-.2.5-.5z" />
  </Svg>
)

export default SvgComponent
