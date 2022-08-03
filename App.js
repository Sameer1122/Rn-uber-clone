import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Home from './screens/Home';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './screens/MapScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
          name='HomeScreen'
          component={Home}
          options = {
           { headerShown: false}
          }
          />
          <Stack.Screen
          name='MapScreen'
          component={MapScreen}
          options = {
           { headerShown: false}
          }
          />
        </Stack.Navigator>
     
    </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
