import React from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles'

export function SignUpFirstStep() {
  const theme = useTheme()
  const navigation = useNavigation()
  
  function handleGoBack() {
    navigation.goBack()
  }

  function handleNextStep() {
    navigation.navigate('SignUpSecondStep')
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.background_primary}
            translucent
          />
          
          <Header>
            <BackButton onPress={handleGoBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'}
            conta
          </Title>

          <Subtitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}