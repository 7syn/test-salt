import { PixelRatio, Dimensions } from 'react-native';

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 736;

const scaleVertical = (size) => {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').height / guidelineBaseHeight) * size,
  );
};

const scaleHorizontal = (size) => {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').width / guidelineBaseWidth) * size,
  );
};

const getDimensionWidth = value => Dimensions.get('window').width * value;
const getDimensionHeight = value => Dimensions.get('window').height * value;

export {
  scaleVertical, scaleHorizontal, getDimensionWidth, getDimensionHeight,
};
