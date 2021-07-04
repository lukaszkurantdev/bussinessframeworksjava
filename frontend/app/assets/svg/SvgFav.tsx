import React from 'react'
import Svg, { Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={18} height={16} {...props}>
    <Path
      d="M8.885 14.646c-.195-.234-.37-.487-.59-.699-2.032-1.963-4.085-3.9-6.096-5.882-1.885-1.859-1.49-4.798.777-6.06 1.463-.815 3.307-.636 4.546.479.488.441.921.941 1.414 1.454.535-.513.997-.976 1.48-1.415 1.736-1.558 4.431-1.298 5.823.554 1.108 1.472 1.008 3.49-.31 4.841-1.177 1.205-2.431 2.344-3.628 3.532-1.065 1.06-2.1 2.15-3.15 3.226l-.266-.03z"
      stroke="#000"
      strokeWidth={1.3}
      fill="none"
      fillRule="evenodd"
    />
  </Svg>
)

export default SvgComponent
