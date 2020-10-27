import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Search from './../components/Search';
import FilmDetail from './../components/FilmDetail';
import Favorites from './../components/Favorites';
import Test from './../components/Test';
import { Image, StyleSheet } from 'react-native';

const _SearchStackNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Search'
        component={Search}
        options={{ title: 'Rechercher' }}
      />
      <Stack.Screen
        name='FilmDetail'
        component={FilmDetail}
        options={{ title: 'Detail du film' }}        
      />
    </Stack.Navigator>
  )
}

const _FavoritesStackNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={{ title: 'Mes favoris' }}
      />  
      <Stack.Screen
        name='FilmDetail'
        component={FilmDetail}
        options={{ title: 'Detail du film' }}
      />    
    </Stack.Navigator>
  )
}

const _TestStackNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Test'
        component={Test}
        options={{ title: 'Test' }}
      />        
    </Stack.Navigator>
  )
}

const _MoviesTabNavigator = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'SearchStackNavigation') {
              // iconName = focused
              //   ? 'ios-information-circle'
              //   : 'ios-information-circle-outline';
              iconName=require('./../Images/ic_search.png')
            } else if (route.name === 'FavoritesStackNavigation') {
              //iconName = focused ? 'ios-list-box' : 'ios-list';
              iconName=require('./../Images/ic_favorite.png')
            }else if (route.name === 'TestStackNavigation') {
              //iconName = focused ? 'ios-list-box' : 'ios-list';
              iconName=require('./../Images/ic_share.png')
            }

            // You can return any component that you like here!
            //return <Ionicons name={iconName} size={size} color={color} />;
            return <Image source={iconName} style={styles.icon}/>;
          },
        })}
        tabBarOptions={{
          // activeTintColor: 'tomato',
          // inactiveTintColor: 'gray',
          activeBackgroundColor : '#dddddd',
          inactiveBackgroundColor: '#ffffff',       
          showLabel: false,
          showIcon: true
        }}
    >
      
      <Tab.Screen
        name='SearchStackNavigation'
        component={_SearchStackNavigation}
        //options={{ title: 'Rechercher' }}        
      />     
      <Tab.Screen
        name='FavoritesStackNavigation'
        component={_FavoritesStackNavigation}
      />
       <Tab.Screen
        name='TestStackNavigation'
        component={_TestStackNavigation}
      />
      
    </Tab.Navigator>
  )
}

const Navigation = () => {
    return <NavigationContainer>{_MoviesTabNavigator()}</NavigationContainer>
}

const styles=StyleSheet.create({
  icon : {
    width : 30,
    height : 30,   

  }
})
export default Navigation
