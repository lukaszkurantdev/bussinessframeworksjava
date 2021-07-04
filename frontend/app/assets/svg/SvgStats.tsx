import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={31.602} height={29.337} viewBox="0 0 31.602 29.337" {...props}>
      <Path
        data-name="ios-pulse"
        d="M28.4 15.813a3.405 3.405 0 00-3.4 2.316h-2.746l-2-6.024a1.129 1.129 0 00-1.072-.776h-.021a1.115 1.115 0 00-1.058.818l-3.142 10.955L11.272.946A1.132 1.132 0 009.057.854L5.318 18.129h-4.19a1.129 1.129 0 100 2.257h5.079a1.125 1.125 0 001.093-.853L9.938 6.681l3.618 21.718a1.12 1.12 0 001.051.938h.063a1.132 1.132 0 001.086-.818l3.506-12.245 1.109 3.339a1.138 1.138 0 001.072.776h3.6a3.386 3.386 0 103.357-4.576z"
        fill="rgb(197, 57, 92)"
      />
    </Svg>
  );
}

export default SvgComponent;
