import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

const scaleWidth = size => (SCREEN_WIDTH / baseWidth) * size;
const scaleHeight = size => (SCREEN_HEIGHT / baseHeight) * size;

const normalizeFontSize = size => {
    const newSize = scaleWidth(size);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { scaleWidth, scaleHeight, normalizeFontSize };
