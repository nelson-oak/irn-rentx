import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles'

export function Home() {
  const car = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'ao dia',
      price: 120
    },
    thumbnail: 'https://vehicle.images.leaseloco.com/large/profile/Audi_Rs5_Coupe_1.png'
  }

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

      <Car car={car} />
      <Car car={car} />
    </Container>
  )
}