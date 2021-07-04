import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import Colors from 'styles/Colors';

function SvgComponent(props) {
  return (
    <Svg width={87} height={87} viewBox="0 0 87 87" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__b"
          y1={-0.06}
          x2={1.198}
          y2={1.224}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor={Colors.primary} />
          <Stop offset={1} stopColor={Colors.secondary} />
        </LinearGradient>
      </Defs>
      <G data-name="Component 2 \u2013 63">
        <G filter="url(#prefix__a)" data-name="Group 2">
          <Circle
            data-name="Ellipse 10"
            cx={28.5}
            cy={28.5}
            r={28.5}
            transform="translate(15 9)"
            fill="url(#prefix__b)"
          />
        </G>
        <G filter="url(#prefix__c)">
          <Path
            data-name="Rectangle 186"
            d="M48 24v27h-9V33a9 9 0 019-9z"
            fill="#fff"
          />
        </G>
        <G filter="url(#prefix__d)">
          <Path
            data-name="Rectangle 187"
            d="M37 36v15h-9v-6a9 9 0 019-9z"
            fill="#fff"
          />
        </G>
        <G filter="url(#prefix__e)">
          <Path
            data-name="Rectangle 188"
            d="M59 31v20h-9V40a9 9 0 019-9z"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
