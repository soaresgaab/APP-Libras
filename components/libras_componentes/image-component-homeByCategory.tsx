import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
import { View } from '../Themed';

export const SVGSinaisImageByCategory = (props: any) => {
  const { imageSource } = props;
  return (
  <Svg
    width="90%"
    height="100%"
    viewBox="0 0 111 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={111} height={84} rx={20} fill="url(#pattern0_3_511)" />
    <Defs>
      <Pattern
        id="pattern0_3_511"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#image0_3_511"
          transform="matrix(0.00473934 0 0 0.00626269 0 -0.0479858)"
        />
      </Pattern>
      <Image
        id="image0_3_511"
        width={211}
        height={175}
        xlinkHref={imageSource}
      />
    </Defs>
  </Svg>
);
};
