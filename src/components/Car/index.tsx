import React from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Car as CarModel } from '../../database/models/Car'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles'

interface ICarProps extends RectButtonProps {
  car: CarModel
}

export function Car({
  car,
  ...rest
}: ICarProps) {
  const netInfo = useNetInfo()

  const MotorIcon = getAccessoryIcon(car.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{ uri: car.thumbnail }}
        resizeMode="contain"
      />
    </Container>
  )
}