import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Search from './../Components/Search';
import FilmDetail from './../Components/FilmDetail';
import Favorites from './../Components/Favorites';
import Home from '../Components/Home';
import {MCC_COLORS} from './../Utils/Utils';

const _HomeStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accueil"
        component={Home}
        options={{
          title: 'Accueil',
          headerStyle: {
            backgroundColor: MCC_COLORS.green,
          },
          headerTintColor: MCC_COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const _SearchStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Rechercher',
          headerStyle: {
            backgroundColor: MCC_COLORS.green,
          },
          headerTintColor: MCC_COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="FilmDetail"
        component={FilmDetail}
        options={{title: 'Detail du film'}}
      />
    </Stack.Navigator>
  );
};

const _FavoritesStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Mes favoris'}}
      />
      <Stack.Screen
        name="FilmDetail"
        component={FilmDetail}
        options={{title: 'Detail du film'}}
      />
    </Stack.Navigator>
  );
};

const _MccTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'HomeStackNavigation') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchStackNavigation') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: MCC_COLORS.green,
        inactiveTintColor: MCC_COLORS.gray,
        showLabel: false,
        activeBackgroundColor: MCC_COLORS.gray,
        inactiveBackgroundColor: MCC_COLORS.white,
        style: {
          borderTopWidth: 0.4,
        },
      }}>
      <Tab.Screen name="HomeStackNavigation" component={_HomeStackNavigation} />
      <Tab.Screen
        name="SearchStackNavigation"
        component={_SearchStackNavigation}
      />
      <Tab.Screen
        name="FavoritesStackNavigation"
        component={_FavoritesStackNavigation}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return <NavigationContainer>{_MccTabNavigator()}</NavigationContainer>;
};

export default Navigation;
