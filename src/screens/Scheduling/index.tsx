import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

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

export function Scheduling() {
  const theme = useTheme()

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
          onPress={() => {}}
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
        
      </Content>

      <Footer>
        <Button
          title="Confirmar"
        />
      </Footer>

    </Container>
  )
}