import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props: any) => (
  <Svg width="50pt" height={64} viewBox="0 0 50 48" {...props}>
    <Path
      d="M32.727 0L25 6.879 17.273 0l-2.242 10.148-10.258-.98 4.098 9.543L0 24l8.871 5.29-4.098 9.542 10.258-.98L17.273 48 25 41.121 32.727 48l2.242-10.148 10.258.98-4.098-9.543L50 24l-8.871-5.29 4.098-9.542-10.258.98zm0 0"
      fillRule="evenodd"
      fill="#ffed00"
    />
  </Svg>
)

export default SvgComponent
