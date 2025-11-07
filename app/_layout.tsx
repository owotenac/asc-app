import { TabBarTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const logoASC = require('../assets/images/logo.png');

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (

    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={
              TabBarTheme
          }>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="index" options={{ headerShown: true, title: "As Canet" }} /> 
          <Stack.Screen name="agenda-setup" options={{ headerShown: true, title: "Agenda" }} />
          <Stack.Screen name="resultat-setup" options={{ headerShown: true, title: "Résultats" }} />
          <Stack.Screen name="agenda" options={{ headerShown: true, title: "Agenda du Week end" }} />*/}
          <Stack.Screen name="category" options={{ headerShown: true, title: "Catégories" }} />
          <Stack.Screen name="resultat" options={{ headerShown: true, title: "Résultats du Week end" }} />
          <Stack.Screen name="date-picker" options={{ headerShown: true, title: "Date" }} />
          <Stack.Screen name="team-details" options={{ headerShown: true, title: "Team" }} />

        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>

  );
}
