import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'

import ArrowSvg from '../../assets/arrow.svg'

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
import { Calendar } from '../../components/Calendar'

export function Scheduling() {
  const navigation = useNavigation()
  const theme = useTheme()

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails')
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
          onPress={() => navigation.goBack()}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}/>
          </DateInfo>
        </RentalPeriod>
      </Header>
      
      <Content>
        <Calendar />
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