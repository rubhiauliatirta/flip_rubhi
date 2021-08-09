import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLOR_ORANGE } from '../helpers/constants';

function DownIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__h-6 prefix__w-6"
      fill="none"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      stroke={COLOR_ORANGE}
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </Svg>
  );
}

export default DownIcon;
