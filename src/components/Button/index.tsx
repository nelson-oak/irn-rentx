import React from 'react'

import {
  Container,
  Title,
} from './styles'

interface IButtonProps {
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