import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={166.5} height={128.077} viewBox="0 0 166.5 128.077" {...props}>
      <Path
        data-name="Path 8"
        d="M29.458 116.87h-16.33a1.606 1.606 0 01-1.6-1.6V12.808a1.606 1.606 0 011.6-1.6h16.21a5.9 5.9 0 005.884-5.6 5.259 5.259 0 00-1.641-4A7.152 7.152 0 0028.817 0H7.2C3.2 0 0 2.4 0 6.4v115.273c0 4 2.8 6.4 6.8 6.4h22.538c3.162 0 5.8-2.081 5.884-5.123a5.52 5.52 0 00-1.641-4.122 5.93 5.93 0 00-4.123-1.958zM159.7 0h-22.538a5.611 5.611 0 00-5.6 7.324 4.336 4.336 0 00.32.76 5.664 5.664 0 005.163 3.122h16.33a1.606 1.606 0 011.6 1.6v102.423a1.606 1.606 0 01-1.6 1.6h-16.21a5.833 5.833 0 00-5.884 5.563 5.609 5.609 0 001.641 4.162 5.513 5.513 0 004.122 1.521H159.7c4 0 6.8-2.4 6.8-6.564V6.4c0-4-2.8-6.4-6.8-6.4z"
        fill={props.color || '#fff'}
      />
      <Path
        data-name="Path 9"
        d="M29.815 32.02a5.612 5.612 0 00-5.6 5.563v52.872a5.604 5.604 0 0011.207 0V37.583a5.612 5.612 0 00-5.607-5.563zm106.864 64.038a5.612 5.612 0 005.6-5.563V37.583a5.604 5.604 0 00-11.207 0v52.872a5.62 5.62 0 005.611 5.603zm-25.212-76.846a5.707 5.707 0 00-5.6 5.763v78.087a5.606 5.606 0 1011.207 0V24.975a5.707 5.707 0 00-5.607-5.763zm-56.434 0a5.707 5.707 0 00-5.6 5.763v78.087a5.606 5.606 0 1011.207 0V24.975a5.681 5.681 0 00-5.606-5.763zm28.217 6.4a5.663 5.663 0 00-5.6 5.683v65.439a5.604 5.604 0 1011.207 0V31.299a5.663 5.663 0 00-5.607-5.687z"
        fill={props.color || 'rgb(197, 57, 92)'}
      />
    </Svg>
  );
}

export default SvgComponent;
