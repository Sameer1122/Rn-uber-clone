import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
const data = [
    {
    id: "123",
    title: 'Get a ride',
    screen: 'MapScreen',
    image: 'https://links.papareact.com/3pn'
},
{
    id: "456",
    title: 'Order Food',
    screen: 'EatsScreen',
    image: 'https://links.papareact.com/28w'
}
]
const NavOptions = () => {
    const navigation =useNavigation()
  return (
    
    <FlatList
    horizontal
    data={data}
    keyExtractor = {(item) => item.id}
    renderItem = {({item}) => {
     return ( <TouchableOpacity
     onPress={() => navigation.navigate(item.screen)}
      style = {tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
        <View>
          <Image 
          style = {{width: 120, height:120, resizeMode: 'contain'}}
          source = {{uri: item.image}}
          />
          <Text style = {tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          <Icon
          style={tw`p-2 bg-black rounded-full w-10 mt-4`}
          name = 'arrowright'
          color='white'
          type = 'antdesign'
          />
          </View>
      </TouchableOpacity>)
    }}
     />
  )
}

export default NavOptions