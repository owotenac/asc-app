import { CalendarDaysIcon, EyeIcon, Icon } from '@/components/ui/icon';
import { TabBarTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
          tabBarIcon: ({ color }) => <Icon size='xl' as={CalendarDaysIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => <Icon size='xl' as={CalendarDaysIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resultat-setup"
        options={{
          title: 'Resultat',
          tabBarIcon: ({ color }) => <Icon size='xl' as={EyeIcon} color={color} />,
        }}
      />


    </Tabs>
  );
}
