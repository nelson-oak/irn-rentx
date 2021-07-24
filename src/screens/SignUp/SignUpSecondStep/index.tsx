import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useTheme } from 'styled-components'

import { api } from '../../../services/api'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles'

interface ISignUpSecondStepParams {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const { user } = route.params as ISignUpSecondStepParams
  
  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if (!password) {
      return Alert.alert('Opa', 'Senha obrigatória')
    }

    if (password !== passwordConfirmation) {
      return Alert.alert('Opa', 'Senhas não são iguais')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: 'Agora é só fazer login \n e aproveitar.',
        nextScreen: 'SignIn'
      })
    }).catch((error) => {
      console.log(error)
      return Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro')
    })
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
              <Bullet />
              <Bullet active />
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
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}