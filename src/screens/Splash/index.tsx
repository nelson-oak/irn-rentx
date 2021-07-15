import React from 'react'
import { StatusBar, Button, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

import {
  Container,
} from './styles'

export function Splash() {
  const animation = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animation.value },
      ]
    }
  })

  function handleAnimatePosition() {
    animation.value = Math.random() * 350
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handleAnimatePosition} />
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  }
})