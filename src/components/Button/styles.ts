import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface IContainerProps {
  color?: string;
}

interface ITitleProps {
  light: boolean
}

export const Container = styled(RectButton)<IContainerProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`

export const Title = styled.Text<ITitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`