import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={152} height={119.361} viewBox="0 0 152 119.361" {...props}>
      <G transform="translate(-32 -80.1)">
        <Path
          data-name="Path 7"
          d="M179.25 173.675H36.75a4.75 4.75 0 000 9.5h142.5a4.75 4.75 0 000-9.5zm0 16.286H36.75a4.75 4.75 0 000 9.5h142.5a4.75 4.75 0 000-9.5zM172.091 80.1H43.909A11.946 11.946 0 0032 92.009v60.325a11.946 11.946 0 0011.909 11.909h128.182A11.946 11.946 0 00184 152.334V92.009A11.946 11.946 0 00172.091 80.1zm-112.27 73.286H47.607a4.75 4.75 0 010-9.5h12.214a4.75 4.75 0 010 9.5zm0-52.929H47.607a4.75 4.75 0 010-9.5h12.214a4.75 4.75 0 010 9.5zM108 149.314a27.143 27.143 0 1127.143-27.143A27.179 27.179 0 01108 149.314zm60.393 4.071h-12.214a4.75 4.75 0 010-9.5h12.214a4.75 4.75 0 010 9.5zm0-52.929h-12.214a4.75 4.75 0 010-9.5h12.214a4.75 4.75 0 010 9.5z"
          fill="#fff"
        />
        <Circle
          data-name="Ellipse 12"
          cx={17.982}
          cy={17.982}
          r={17.982}
          transform="translate(90.018 104.834)"
          fill="rgb(197, 57, 92)"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
