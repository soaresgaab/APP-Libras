import { Dimensions } from 'react-native';

const useDeviceType = () => {
  const { width, height } = Dimensions.get('window');

  const isWeb = width >= 1000 && height >= 617;
  const isTablet = !isWeb && width >= 768 && height >= 1024;
  const isPhone = !isWeb && !isTablet;

  return { isWeb, isTablet, isPhone };
};

export default useDeviceType;
