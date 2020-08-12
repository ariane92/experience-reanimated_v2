import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import Img from './assets/hero.png';

const App: React.FC = () => {
  const titlePosition = useSharedValue(100);
  const imagePosition = useSharedValue(-100);

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.bounce,
      },
      () => {
        titlePosition.value = withTiming(0, {
          duration: 1000,
          easing: Easing.bounce,
        });
      },
    );
  }, [titlePosition.value, imagePosition.value]);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
      opacity: interpolate(
        titlePosition.value,
        [100, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: imagePosition.value}],
    };
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131a" />
      <Animated.Image source={Img} style={[styles.hero, imageStyle]} />
      <Animated.Text style={[styles.text, titleStyle]}>Fala Ari</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131a',
  },

  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  hero: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },
});
export default App;
