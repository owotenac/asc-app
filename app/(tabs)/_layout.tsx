import { TabBarTheme } from '@/constants/theme';
import { featureFlags } from '@/hooks/config';
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
          tabBarShowLabel: false,
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={'black'} /> ,
        }}
      />
      <Tabs.Screen
        name="full-agenda"
        options={{
                    tabBarShowLabel: false,
          title: 'Agenda',
          tabBarIcon: ({ color }) => <Entypo name="calendar" size={24} color={'black'} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
                    tabBarShowLabel: false,
          title: 'Admin',
          href: featureFlags.isReadOnly ? null : undefined,
          tabBarIcon: ({ color }) => <AntDesign name="menu" size={24} color={'black'} /> 
        }}
      />
    </Tabs>
  );
}
