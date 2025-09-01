import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import InserirScreen from '../screens/InserirScreen';
import BuscarScreen from '../screens/BuscarScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#222',
        },
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Ver Usuários"
        component={BuscarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inserir Usuários"
        component={InserirScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
