import React, { useState, useEffect} from 'react'
import { Alert, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useNetInfo } from '@react-native-community/netinfo'
import { format } from 'date-fns'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  OfflineInfo
} from './styles'

import { api } from '../../services/api'
import { ICarDTO } from '../../dtos/ICarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'
import { RFValue } from 'react-native-responsive-fontsize'

interface ISchedulingDetailsParams {
  car: ICarDTO;
  dates: string[]
}

interface IRentalPeriod {
  start: Date
  startFormatted: string
  end: Date
  endFormatted: string
}

export function SchedulingDetails() {
  const [updatedCar, setUpdatedCar] = useState<ICarDTO>({} as ICarDTO)

  const [loading, setLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)
  
  const { user } = useAuth()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const netInfo = useNetInfo()

  const { car, dates } = route.params as ISchedulingDetailsParams
  const rentTotal = dates.length * car.price

  async function handleConfirmRental() {
    setLoading(true)

    await api
      .post('rentals', {
        user_id: user.id,
        car_id: car.id,
        start_date: rentalPeriod.start,
        end_date: rentalPeriod.end,
        total: rentTotal
      })
      .then(() => navigation.navigate('Confirmation', {
        title: 'Carro Alugado!',
        message: 'Agora você só precisa ir \n até a concessionária da RENTX \n pegar seu automóvel.',
        nextScreen: 'Home'
      }))
      .catch((error) => {
        Alert.alert('Não foi possível confirmar o agendamento')
        setLoading(false)
      })
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: getPlatformDate(new Date(dates[0])),
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end : getPlatformDate(new Date(dates[dates.length - 1])),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

  useEffect(() => {
    async function fetchUpdatedCar() {
      const response = await api.get(`cars/${car.id}`)
      setUpdatedCar(response.data)
    }

    if (netInfo.isConnected === true) {
      fetchUpdatedCar()
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={
            updatedCar.photos ?
            updatedCar.photos :
            [{ id: car.thumbnail, photo: car.thumbnail }]
          } />
        </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            updatedCar.accessories && updatedCar.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true && !loading}
          loading={loading}
        />

        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro
          </OfflineInfo>
        }
      </Footer>
    </Container>
  )
}