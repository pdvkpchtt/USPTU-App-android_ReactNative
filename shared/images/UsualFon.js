import * as React from "react";
import Svg, { G, Path, Mask, Defs, ClipPath } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={390}
    height={706}
    viewBox="0 0 390 706"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#F2F2F7" d="M0 0h390v706H0z" />
  </Svg>
);

export default SvgComponent;
