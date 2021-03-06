import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import {
  Container,
  Title,
} from './styles'

interface IButtonProps extends RectButtonProps {
  title: string
  color?: string
  light?: boolean
  loading?: boolean
}

export function Button({
  title,
  color,
  light = false,
  enabled = true,
  loading = false,
  ...rest
}: IButtonProps) {
  const theme = useTheme()

  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
      {...rest}
    >
      {
        loading
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title light={light}>{title}</Title>
      }
    </Container>
  )
}