import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
const App: React.FC = () => {
  const titlePosition = useSharedValue(30);

  useEffect(() => {
    titlePosition.value = withTiming(0, {
      duration: 2000,
      easing: Easing.bounce,
    });
  }, [titlePosition.value]);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
    };
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131a" />
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
});
export default App;
