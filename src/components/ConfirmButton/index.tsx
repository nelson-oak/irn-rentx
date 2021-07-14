import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import {
  Container,
  Title,
} from './styles'

interface IConfirmButtonProps extends RectButtonProperties {
  title: string
}

export function ConfirmButton({
  title,
  ...rest
}: IConfirmButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}