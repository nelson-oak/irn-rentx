import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'

import { Car as CarModel } from '../../database/models/Car'
import { api } from '../../services/api'

interface IRentalProps {
  id: string
  car: CarModel
  start_date: string
  end_date: string
}

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

export function MyCars() {
  const [cars, setCars] = useState<IRentalProps[]>([])
  const [loading, setLoading] = useState(false)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        
        const { data } = await api.get('rentals')
        const formattedData = data.map((rental: IRentalProps) => {
          return {
            id: rental.id,
            car: rental.car,
            start_date: format(parseISO(rental.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(rental.end_date), 'dd/MM/yyyy')
          }
        })

        setCars(formattedData)
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
        <BackButton
          color={theme.colors.shape}
          onPress={handleGoBack}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {
        loading
        ? <LoadAnimation />
        : (
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car car={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
        )
      }
    </Container>
  )
}