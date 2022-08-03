import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../util/SafeViewAndroid'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptions from '../components/RideOptions'
import {createStackNavigator} from '@react-navigation/stack'

const MapScreen = () => {
  const Stack = createStackNavigator()
  return (
    <SafeAreaView style = {SafeViewAndroid.AndroidSafeArea}>
      <View style = {tw`h-1/2`}>
        <Map />
      </View>
      <View style = {tw`h-1/2`}>
        <Stack.Navigator>
        <Stack.Screen
          name='NavigateCard'
          component={NavigateCard}
          options = {
           { headerShown: false}
          }
          />
          <Stack.Screen
          name='RideOptionsCard'
          component={RideOptions}
          options = {
           { headerShown: false}
          }
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})