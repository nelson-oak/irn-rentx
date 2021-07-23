import React from 'react'
import { StatusBar } from 'react-native'
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

export function SignUpFirstStep() {
  const theme = useTheme()
  const navigation = useNavigation()
  
  function handleGoBack() {
    navigation.goBack()
  }

  return (
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
      </Form>
    </Container>
  )
}