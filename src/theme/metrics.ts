import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  tabBarHeight: 50,
  padding: {
    tiny: 4,
    small: 8,
    regular: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
    xxlarge: 64,
  },
  margin: {
    tiny: 4,
    small: 8,
    regular: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
    xxlarge: 64,
  },
  borderRadius: {
    tiny: 2,
    small: 4,
    regular: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
  },
  icons: {
    tiny: 16,
    small: 20,
    regular: 24,
    medium: 28,
    large: 32,
    xlarge: 40,
  },
};

export default metrics;
