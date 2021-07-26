import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup
          .string()
          .required('Senha obrigatória'),
        email: Yup
          .string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
      })

      await schema.validate({ email, password })

      await signIn({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }

      return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifica as credenciais')
    }
  }

  function handleNewAccout() {
    navigation.navigate('SignUpFirstStep')
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
            <Title>
              Estamos {'\n'}
              quase lá.
            </Title>

            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccout}
              light
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}