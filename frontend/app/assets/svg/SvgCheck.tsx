import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props: any) {
  return (
    <Svg width={19} height={19} viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="#707070"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 128L192 384l-96-96"
      />
    </Svg>
  );
}

export default SvgComponent;
