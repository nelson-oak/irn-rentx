import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as Yup from 'yup'
import { useNetInfo } from '@react-native-community/netinfo'

import { useAuth } from '../../hooks/auth'
import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Button } from '../../components/Button'

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

export function Profile() {
  const { user, signOut, updateUser } = useAuth()
  const netInfo = useNetInfo()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  async function handleSignOut() {
    try {
      Alert.alert(
        'Tem certeza?',
        'Se você sair, vai precisar de internet para conectar-se novamente',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Sair',
            onPress: () => signOut()
          }
        ]
      )
    } catch {
      Alert.alert('Erro ao fazer logout da aplcação')
    }
  }

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && selectedOption === 'passwordEdit') {
      return Alert.alert('Você está Offline', 'Para mudar a senha, conecte-se a Internet')
    }

    setOption(selectedOption)
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup
          .string()
          .required('CNH obrigatória'),
        name: Yup
          .string()
          .required('Nome obrigatório'),
      })

      const data = { name, driverLicense }
      
      await schema.validate(data)

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      })

      Alert.alert('Perfil atualizado')
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }

      return Alert.alert('Não foi possível atualizar o perfil')
    }
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
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleSelectAvatar}>
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
                  onChangeText={setName}
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
                  onChangeText={setDriverLicense}
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

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}