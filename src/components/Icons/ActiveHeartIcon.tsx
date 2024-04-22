import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ActiveHeartIcon: React.FC = () => (
  <Svg width={85.333} height={85.333} viewBox="0 0 64 64" fill='red'>
    <Path d="M10.4 7.9c-4.8 2.2-8 6-9.4 11.2-2.6 9.7 5.6 21.5 23.3 33.7l7.7 5.3 7.8-5.3C49.5 46.2 58.1 37.7 61 32c4.4-8.5 2.4-17.8-4.9-22.7-6.5-4.4-14.9-3.8-21.1 1.4l-3.1 2.6-2.2-2.1C26.8 8.5 20.8 6 17.3 6c-1.5 0-4.6.9-6.9 1.9z" />
  </Svg>
);

export default ActiveHeartIcon;
