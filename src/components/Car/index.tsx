import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import GasolineSvg from '../../assets/gasoline.svg'

import { ICarDTO } from '../../dtos/ICarDTO'

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
  car: ICarDTO
}

export function Car({
  car,
  ...rest
}: ICarProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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