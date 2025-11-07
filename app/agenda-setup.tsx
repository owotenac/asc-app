import { Text } from '@/components/ui/text';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { Pressable } from '@/components/ui/pressable';

import { ChevronRightIcon, Icon } from '@/components/ui/icon';

import { useAppStore } from '@/constants/filter';


export default function AgendaScreen() {
  const router = useRouter();
  const {date, setDate} = useAppStore();
  const {category, setCategory} = useAppStore();


  const generate = () => {
    const d = dayjs(date).format('YYYY-MM-DD')
    router.push({
      pathname: '/agenda',
      params: { date: d, category: category }
    }
    )
  }
  const chooseCategory = () => {
    router.push({
      pathname: '/category',
      params: { category: category }
    }
    );
  }
   const chooseDate = () => {
    router.push({
      pathname: '/date-picker',
      params: { category: category }
    }
    );
  }
   
  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}> */}
        <View style={styles.view}>
          <Text className="font-bold" size='xl'>Catégorie</Text>


                            <Pressable onPress={() => chooseCategory()} style={styles.pressable}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{category ? category : "Select Category... "}</Text>
                            <Icon as={ChevronRightIcon} size="lg" />
                        </View>
                    </Pressable>

                    <Text className="font-bold" size='xl'>Date</Text>

                    <Pressable onPress={() => chooseDate()} style={styles.pressable}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{date ? dayjs(date).format('MMMM DD YYYY') : "Select Date... "}</Text>
                            <Icon as={ChevronRightIcon} size="lg" />
                        </View>
                    </Pressable>


          <Button title="Generate Agenda" disabled={!category} onPress={generate} />
        </View>
        {/* </ImageBackground> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#024906ff'
  },
  view: {
    flex: 1,
    padding: 20,
    gap: 10
  },
    pressable: {
        marginBottom: 10,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        paddingVertical: 8,
    }

});
