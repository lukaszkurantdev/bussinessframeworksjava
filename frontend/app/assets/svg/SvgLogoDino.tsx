import React from 'react'
import Svg, { Defs, Path, G, Mask, Use } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = (props: any) => (
  <Svg width={45} height={16} {...props}>
    <Defs>
      <Path id="prefix__a" d="M0 .064h44.756v15.733H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M17.049.279c1.395 0 2.533 1.088 2.533 2.422s-1.138 2.423-2.533 2.423-2.533-1.089-2.533-2.423S15.654.28 17.049.28m-.713.527c-.061-.11-.307-.044-.49.075-.181.12-.33.314-.232.415.098.102.226-.127.408-.246.182-.119.374-.135.314-.244"
        fill="#FFF"
      />
      <G transform="translate(0 .139)">
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Path
          d="M12.013 15.578H7.147v-1.27c-.295.336-.556.584-.783.745a3.979 3.979 0 01-2.348.744c-1.362 0-2.371-.481-3.029-1.445-.658-.964-.987-2.3-.987-4.008 0-1.738.385-3.081 1.157-4.03.771-.95 1.928-1.423 3.471-1.423.568 0 1.124.13 1.668.393.181.088.397.227.646.417V.064h5.071v15.514zM39.175 4.894c3.074 0 5.581 2.398 5.581 5.338s-2.507 5.338-5.581 5.338c-3.075 0-5.582-2.398-5.582-5.338s2.507-5.338 5.582-5.338zm0 3.89c.834 0 1.515.65 1.515 1.448 0 .798-.68 1.45-1.515 1.45-.835 0-1.515-.652-1.515-1.45 0-.798.68-1.449 1.515-1.449zm-7.12 6.794h-5.071V9.511c0-.408-.25-.612-.749-.612-.5 0-.749.204-.749.612v6.067h-5.07V5.11h4.866v1.336c.25-.35.476-.606.68-.766.681-.526 1.52-.788 2.52-.788 1.383 0 2.359.386 2.926 1.16.431.584.647 1.417.647 2.497v7.03zm-13.243 0h-5.071V5.186h.41c.479.548 1.254.906 2.126.906.872 0 1.647-.358 2.126-.907h.41l-.001 10.393zM6.01 9.016c.753 0 1.366.65 1.366 1.445 0 .796-.613 1.445-1.366 1.445-.752 0-1.366-.65-1.366-1.445 0-.796.614-1.445 1.366-1.445z"
          fill="#FFF"
          mask="url(#prefix__b)"
        />
      </G>
    </G>
  </Svg>
)

export default SvgComponent
