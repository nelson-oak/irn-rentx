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

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

export function SignUpFirstStep() {
  const theme = useTheme()
  const navigation = useNavigation()
  
  function handleGoBack() {
    navigation.goBack()
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
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
            />
          </Form>

          <Button
            title="Próximo"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}