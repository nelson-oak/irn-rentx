import React from 'react'
import { StatusBar } from 'react-native'

import {
  Container,
  Header,
  CarImages,
} from './styles'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

export function CarDetails() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://vehicle.images.leaseloco.com/large/profile/Audi_Rs5_Coupe_1.png']} />
      </CarImages>
    </Container>
  )
}