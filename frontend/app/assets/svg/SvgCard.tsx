import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={148.863}
      height={106.33}
      viewBox="0 0 148.863 106.33"
      {...props}>
      <Path
        data-name="ios-card"
        d="M148.863 10.633A10.664 10.664 0 00138.23 0H10.633A10.664 10.664 0 000 10.633v15.95h148.863zM0 95.7a10.664 10.664 0 0010.633 10.63h127.6a10.664 10.664 0 0010.63-10.63V42.532H0zm47.184-15.95h54.494a4.652 4.652 0 110 9.3H47.184a4.652 4.652 0 110-9.3zm-23.924 0h3.987a4.652 4.652 0 110 9.3H23.26a4.652 4.652 0 110-9.3z"
        fill="rgb(197, 57, 92)"
      />
    </Svg>
  );
}

export default SvgComponent;
