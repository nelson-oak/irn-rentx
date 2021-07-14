import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Container,
  Title,
} from './styles'

interface IButtonProps extends RectButtonProps {
  title: string
  color?: string
}

export function Button({
  title,
  color,
  ...rest
}: IButtonProps) {
  return (
    <Container
      color={color}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}