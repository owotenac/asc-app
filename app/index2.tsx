import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';

import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';

const calendarImg = require('../assets/images/calendar.png');
const cupImg = require('../assets/images/cup.png');

export default function ChoiceScreen() {
  const router = useRouter();

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Box className="justify-center-safe">
          <VStack space="xs" reversed={false}>

          <Pressable onPress={() => router.push('/agenda-setup')}>
            <Card className="p-5 rounded-lg max-w-[300px] m-5">
              <Image
                source={calendarImg}
                className=""
                alt="image"
              />
                <Heading size="md" className="mb-4">
                  Voir l'agenda du week end
                </Heading>
            </Card>
            </Pressable>

          <Pressable onPress={() => router.push('/resultat-setup')}>
            <Card className="p-5 rounded-lg max-w-[300px] m-5">
              <Image
                source={cupImg}
                alt="image"
              />
                <Heading size="md" className="mb-4">
                  Voir les resultats du week end
                </Heading>
            </Card>
            </Pressable>

          </VStack>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#024906ff'
  }

});
