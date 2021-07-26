import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

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

export function Home() {
  const [cars, setCars] = useState<ICarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  function handleSelectCar(car: ICarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        if (isMounted) {
          setLoading(true)
        }

        const response = await api.get('/cars')

        if (isMounted) {
          setCars(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars()
    
    return () => {
      isMounted = false
    }
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
    </Container>
  )
}
