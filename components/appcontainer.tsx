// components/AppContainer.tsx
import { asc_background } from "@/constants/theme";
import React, { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export function AppContainer({ children }: { children: ReactNode; } ) {
 
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: asc_background ,
    alignItems: 'center',     // centre le container
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1000 : undefined,
    backgroundColor: '#1e2d1e', // ton vert foncé
  },
});