import { TabBarTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

const logoASC = require('../assets/images/logo.png');




export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [count, setCount] = useState(0);

  const [loaded] = useFonts({
    'LatoRegular': require("@/assets/font/Lato-Regular.ttf"),
    'LatoItalic': require("@/assets/font/Lato-Italic.ttf"),
    'LatoBlackItalic': require("@/assets/font/Lato-BlackItalic.ttf"),
    'Exo2': require("@/assets/font/Exo2-Bold.ttf"),
    'Exo2Italic': require("@/assets/font/Exo2-Italic-VariableFont_wght.ttf"),
  }
  )


  const openMenu = () => {
    console.log("Menu")
  }


  return (

    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={
            TabBarTheme
          }>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category" options={{ headerShown: true, title: "Catégories" }} />
          <Stack.Screen name="resultat" options={{
            headerShown: true,
            title: "Résultats du Week end",
            //header:
            // headerRight: () => <MaterialCommunityIcons.Button name="dots-vertical" size={24} color="black" backgroundColor='white' onPress={openMenu}/>,
          }} />
          <Stack.Screen name="team-details" options={{ headerShown: true, title: "Team" }} />
          <Stack.Screen name="affiche" options={{
            headerShown: true,
            title: "Affiche du Week end",
          }} />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GluestackUIProvider>

  );
}
