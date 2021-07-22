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
  value?: string
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: IPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const theme = useTheme()

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors. main : theme.colors.text_details}
        />
      </IconContainer>

      <InputText
        secureTextEntry={!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      <BorderlessButton onPress={togglePasswordVisibility}>
        <IconContainer isFocused={isFocused}>
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