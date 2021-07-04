import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={23} height={23.006} viewBox="0 0 23 23.006" {...props}>
      <Path
        data-name="ios-settings"
        d="M21.1 11.5A2.96 2.96 0 0123 8.739a11.731 11.731 0 00-1.42-3.42 3 3 0 01-1.2.258 2.953 2.953 0 01-2.7-4.157A11.7 11.7 0 0014.261 0a2.957 2.957 0 01-5.522 0 11.732 11.732 0 00-3.42 1.42 2.953 2.953 0 01-2.7 4.157 2.9 2.9 0 01-1.2-.258A11.991 11.991 0 000 8.745a2.959 2.959 0 01.006 5.522 11.732 11.732 0 001.42 3.42 2.954 2.954 0 013.9 3.9 11.8 11.8 0 003.42 1.42 2.952 2.952 0 015.51 0 11.732 11.732 0 003.42-1.42 2.957 2.957 0 013.9-3.9 11.8 11.8 0 001.42-3.42A2.974 2.974 0 0121.1 11.5zm-9.547 4.786a4.792 4.792 0 114.792-4.792 4.79 4.79 0 01-4.791 4.792z"
        fill="rgb(197, 57, 92)"
      />
    </Svg>
  );
}

export default SvgComponent;