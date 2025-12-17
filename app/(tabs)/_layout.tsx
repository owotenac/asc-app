import { TabBarTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import { Tabs } from 'expo-router';
import React from 'react';

const logoASC = require('../../assets/images/logo.png');

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={
        TabBarTheme
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'AS Canet Saison 25/26',
          tabBarIcon: ({ color }) => <AntDesign name="team" size={24} color={color} /> ,
        }}
      />
      <Tabs.Screen
        name="full-agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => <Entypo name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <AntDesign name="menu" size={24} color={color} /> 
        }}
      />


    </Tabs>
  );
}
