import styled, { css } from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'

interface IOptionProps {
  active: boolean
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(227)}px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
  align-items: center;
`

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
`

export const LogoutButton = styled(BorderlessButton)``

export const PhotoContainer = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 48px;
`

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;
`

export const PhotoButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`

export const Content = styled.View`
  padding: 0 24px;
  margin-top: ${RFValue(100)}px;
`

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  flex-direction: row;
  justify-content: space-around;

  margin-bottom: ${RFValue(24)}px;
`

export const Option = styled.TouchableOpacity<IOptionProps>`
  ${({ active }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${({ theme }) => theme.colors.main};
  `};
  padding: ${RFValue(14)}px;
`

export const OptionTitle = styled.Text<IOptionProps>`
  font-family: ${({ theme, active }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) => active ? theme.colors.header : theme.colors.text_details};
`

export const Section = styled.View``
