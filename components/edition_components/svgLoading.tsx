import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedSVG = () => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [animatedValue]);

  const animatedProps = useAnimatedProps(() => {
    const fillColor = animatedValue.value === 1 ? '#0000FF' : '#FF0000';
    return {
      fill: fillColor,
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg height="200" width="200">
        <AnimatedCircle
          cx="100"
          cy="100"
          r="80"
          animatedProps={animatedProps} // Use animatedProps aqui
        />
      </Svg>
    </View>
  );
};

export default AnimatedSVG;
