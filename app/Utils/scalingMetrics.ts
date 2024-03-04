import { Dimensions } from "react-native";
import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const getFontSize = (size: number) => size / fontScale;
export { horizontalScale, verticalScale, moderateScale, getFontSize };

// UseCases For Metrics
// verticalScale = height,marginVertical,paddingVertical,marginTop,marginBottom,,paddingTop,paddingBottom,line-height, likewise etc
// horizontalScale = width,marginHorizontal,paddingHorizontal,marginLeft,marginRight,paddingLeft,paddingRight, likewise etc
// moderateScale = font-size,borderRadius,borderWidth,borderBottomLeftRadius,borderBottomRightRadius,borderTopRightRadius,borderTopLeftRadius likewise etc
