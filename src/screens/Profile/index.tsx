import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles'
import { PasswordInput } from '../../components/PasswordInput'
import { useAuth } from '../../hooks/auth'

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

  const theme = useTheme()
  const navigation = useNavigation()
  const { user } = useAuth()

  function handleBack() {
    navigation.goBack()
  }

  function handleSignOut() {
  }

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    setOption(selectedOption)
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.header} translucent />
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/41764946?v=4' }} />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar
                  Senha
                </OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' &&
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />

                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
            }
            
            {
              option === 'passwordEdit' &&
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                />
              </Section>
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}