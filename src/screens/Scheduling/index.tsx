import React, { useState } from 'react'
import { StatusBar, Alert } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'

import ArrowSvg from '../../assets/arrow.svg'
import { getPlatformDate } from '../../utils/getPlatformDate'

import { ICarDTO } from '../../dtos/ICarDTO'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, IDayProps, IMarkedDateProps, generateInterval } from '../../components/Calendar'

interface IRentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface ISchedulingParams {
  car: ICarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps)
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>({} as IMarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as ISchedulingParams

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo do aluguel!')
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: IDayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date
    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const dateArray = Object.keys(interval)
    const firstDate = dateArray[0]
    const lastDate = dateArray[dateArray.length - 1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy')
    })
  }

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
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>

    </Container>
  )
}