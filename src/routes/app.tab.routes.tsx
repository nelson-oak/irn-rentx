import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const { Navigator, Screen } = createBottomTabNavigator()

import { AppStackRoutes } from './app.stack.routes'
import { MyCars } from '../screens/MyCars'

export function AppTabRoutes() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={AppStackRoutes}
      />

      <Screen
        name="Profile"
        component={MyCars}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}