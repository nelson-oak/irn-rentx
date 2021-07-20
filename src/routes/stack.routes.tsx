import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import { Splash } from '../screens/Splash'
import { Home } from '../screens/Home'
import { SignIn } from '../screens/SignIn'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { MyCars } from '../screens/MyCars'

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      <Screen
        name="Splash"
        component={Splash}
      />

      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />

      <Screen
        name="SignIn"
        component={SignIn}
      />

      <Screen
        name="CarDetails"
        component={CarDetails}
      />

      <Screen
        name="Scheduling"
        component={Scheduling}
      />

      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />

      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}