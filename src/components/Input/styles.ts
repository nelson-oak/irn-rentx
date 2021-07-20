import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`

export const IconContainer = styled.View`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const InputText = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`