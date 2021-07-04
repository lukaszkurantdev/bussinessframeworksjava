import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Path,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg width={192} height={192} viewBox="0 0 192 192" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__b"
          y1={-0.06}
          x2={1.198}
          y2={1.224}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#c5395c" />
          <Stop offset={1} stopColor="#e7a649" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 10">
        <G data-name="Group 8">
          <G data-name="Group 9">
            <G filter="url(#prefix__a)">
              <Rect
                data-name="Rectangle 412"
                width={174}
                height={174}
                rx={87}
                transform="translate(9 6)"
                fill="url(#prefix__b)"
              />
            </G>
            <G filter="url(#prefix__c)">
              <Path
                data-name="Rectangle 413"
                d="M92 50h19v87H82V60a10 10 0 0110-10z"
                fill="#fff"
              />
            </G>
            <G filter="url(#prefix__d)">
              <Path
                data-name="Rectangle 414"
                d="M58 88h19v49H48V98a10 10 0 0110-10z"
                fill="#fff"
              />
            </G>
            <G filter="url(#prefix__e)">
              <Path
                data-name="Rectangle 415"
                d="M126 72h19v65h-29V82a10 10 0 0110-10z"
                fill="#fff"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
