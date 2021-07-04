import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const SvgComponent = (props: any) => (
  <Svg
    id="prefix__Warstwa_1"
    x={0}
    y={0}
    viewBox="0 0 18 24"
    xmlSpace="preserve"
    {...props}
  >
    <Path
      d="M12.2 10.5c-.3-.3-.8-.3-1.1 0l-1.9 1.9-1.9-1.9c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l1.9 1.9-1.9 1.9c-.3.3-.3.8 0 1.1s.8.3 1.1 0l1.9-1.9 1.9 1.9c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1l-1.9-1.9 1.9-1.9c.2-.3.2-.8 0-1.1z"
    />
    <Path
      d="M16.5 3h-3v-.8c0-.4-.3-.8-.8-.8h-1.6C10.8.6 10 0 9 0S7.2.6 6.9 1.5H5.2c-.4 0-.8.3-.8.8V3h-3C.7 3 0 3.7 0 4.5v18c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-18c0-.8-.7-1.5-1.5-1.5zM6 3h1.5c.4 0 .8-.3.8-.8s.3-.7.7-.7.8.3.8.8.3.7.7.7H12v1.5H6V3zm10.5 19.5h-15v-18h3v.8c0 .4.3.7.7.7h7.5c.4 0 .8-.3.8-.8v-.7h3v18z"
    />
  </Svg>
)

export default SvgComponent
