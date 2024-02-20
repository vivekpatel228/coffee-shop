import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/Home';
import Favorite from './src/screens/Favorite';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';
import IcedCoffee from './src/screens/IcedCoffee';
import HotCoffee from './src/screens/HotCoffee';
import OrderScreen from './src/screens/OrderScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#B87651',
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 4,
            height: 60,
          },
        }}>
        <BottomTab.Screen
          name="Home"
          component={StackNavigation}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Add"
          component={Cart}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home Screen" component={Home} />
      <Stack.Screen name="Hot Coffee" component={HotCoffee} />
      <Stack.Screen name="Iced Coffee" component={IcedCoffee} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
