import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props:any) => (
  <Svg width={18} height={20} viewBox="0 0 20 20" {...props}>
    <Path d="M18.4 10.8l-7-7c-.4-.3-.9-.5-1.5-.5h-.1l-5 .3c-.6 0-1.1.5-1.1 1.1l-.2 1.6c-.2-.1-.4-.2-.5-.4-.5-.5-.9-1.2-.9-1.8-.1-.6.1-1.2.5-1.6.8-.8 2.3-.6 3.3.5.2.2.6.2.8 0 .1-.1.2-.3.2-.4 0-.2-.1-.3-.2-.4C5.2.6 3 .5 1.7 1.7c-.6.6-.9 1.5-.8 2.5.1.9.5 1.8 1.2 2.5.4.4.8.7 1.3.9l-.1 2.2c0 .6.2 1.2.6 1.6l7 7c.5.5 1.1.7 1.7.7.7 0 1.3-.3 1.7-.7l4-4c.5-.5.7-1.1.7-1.7.1-.8-.2-1.4-.6-1.9zM7.1 7.2c.2-.2.2-.3.2-.5s-.1-.3-.2-.4c-.2-.2-.6-.2-.8 0-.4.4-.9.6-1.5.5h-.1l.1-2 5-.3h.1c.2 0 .5.1.6.3l7 7c.2.2.4.6.4.9 0 .3-.1.7-.4.9l-4 4c-.2.2-.6.4-.9.4-.3 0-.7-.1-.9-.4l-7-7c-.2-.2-.3-.4-.3-.7L4.6 8h.1c1 .1 1.8-.2 2.4-.8z" />
  </Svg>
)

export default SvgComponent