import { TabBarTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';




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

  return (
    <>
      <Head>
        <title>AS Canet - L'application Officielle</title>
        <meta name="description" content="Application officielle de l'AS Canet." />
        <meta name="google-site-verification" content="uMsOvMMmk-V6wnN0mHaEQ9FLCfAuaLTKo0DB2rJKvTI" /> 
        <meta name="keywords" content="ASCANET, AS Canet, Football, district, foot, ecole de foot, ASCanet, Hérault, Herault" />

        {/* Open Graph */}
        <meta property="og:title" content="AS Canet" />
        <meta property="og:description" content="Application officielle de l'AS Canet." />
        <meta property="og:url" content="https://www.ascanet.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ascanet.fr/og-image.png" />

        {/* Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AS Canet" />
        <meta name="twitter:description" content="Application officielle de l'AS Canet." />
      </Head>    
     <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={
            TabBarTheme
          }>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
          <Stack.Screen name="sponsors" options={{ headerShown: true, title: "Sponsors" }} />
          <Stack.Screen name="program" options={{ headerShown: true, title: "Programme" }} />
          <Stack.Screen name="team-selection" options={{ headerShown: true, title: "Select Teams" }} />
          <Stack.Screen name="team-classement" options={{ headerShown: true, title: "Select Classement" }} />
        </Stack>
      </ThemeProvider>
  </>
  );
}
