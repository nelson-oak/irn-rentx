import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Ionicons } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'

import { api } from '../../services/api'
import { ICarDTO } from '../../dtos/ICarDTO'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles'

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const theme = useTheme()

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

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        loading
        ? <Load />
        : <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car car={item} onPress={() => handleSelectCar(item)} />
          )}
        />
      }

      <MyCarsButton onPress={handleViewMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}