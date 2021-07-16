import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { StatusBar, StyleSheet, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'

import { Ionicons } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'

import { api } from '../../services/api'
import { ICarDTO } from '../../dtos/ICarDTO'

import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const theme = useTheme()

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, context: any) {
      context.positionX = positionX.value
      context.positionY = positionY.value
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX
      positionY.value = context.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    }
  })

  function handleSelectCar(car: ICarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleViewMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      {
        loading
        ? <LoadAnimation />
        : <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car car={item} onPress={() => handleSelectCar(item)} />
          )}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View 
          style={[
            myCarsButtonStyle,
            styles.myCarsButtonAnimated
          ]}
        >
          <ButtonAnimated
            onPress={handleViewMyCars}
            style={[
              styles.myCarsButton,
              { backgroundColor: theme.colors.main }
            ]}
          >
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  myCarsButtonAnimated: {
    position: 'absolute',
    bottom: 13,
    right: 22,
  },
  myCarsButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})