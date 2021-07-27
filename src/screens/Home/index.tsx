import React, { useEffect, useState } from 'react'
import { StatusBar, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo'
import { synchronize } from '@nozbe/watermelondb/sync'
import { Car as CarModel } from '../../database/models/Car'

import Logo from '../../assets/logo.svg'

import { database } from '../../database'
import { api } from '../../services/api'

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
  const [cars, setCars] = useState<CarModel[]>([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  function handleSelectCar(car: CarModel) {
    navigation.navigate('CarDetails', { car })
  }

  async function databaseSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = data
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const { users } = changes
        if (users) {
          await api.post('users/sync', users)
        }
      },
    })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        if (isMounted) {
          setLoading(true)
        }

        const carCollection = database.get<CarModel>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
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
      <Button title="Synchro" onPress={databaseSynchronize} />

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
