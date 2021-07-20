import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  IconContainer,
  InputText,
} from './styles'
import { BorderlessButton } from 'react-native-gesture-handler'

interface IPasswordProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({
  iconName,
  ...rest
}: IPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const theme = useTheme()

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_details}
        />
      </IconContainer>

      <InputText
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={togglePasswordVisibility}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text_details}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}