import React from 'react'
import { useTheme } from 'styled-components'
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler
} from 'react-native-calendars'
import { Feather } from '@expo/vector-icons'

import { generateInterval } from './generateInterval'
import { ptBR } from './localeConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export interface IMarkedDateProps {
  [date: string]: {
    color: string
    textColor: string
    disabled?: boolean
    disableTouchEvent?: boolean
  }
}

export interface IDayProps {
  dateString: string
  day: number
  month: number
  year: number
  timestamp: number
}

interface ICalendarProps {
  markedDates: IMarkedDateProps
  onDayPress: DateCallbackHandler
}

export function Calendar({
  markedDates,
  onDayPress
}: ICalendarProps) {
  const theme = useTheme()

  return (
    <CustomCalendar
      renderArrow={( direction ) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={`chevron-${direction}`}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_details,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  )
}

export { generateInterval }