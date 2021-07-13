import React from 'react'

import GasolineSvg from '../../assets/gasoline.svg'

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

interface ICar {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  },
  thumbnail: string
}

interface ICarProps {
  car: ICar
}

export function Car({ car }: ICarProps) {
  return (
    <Container>
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