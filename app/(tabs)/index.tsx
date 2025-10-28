import { ThemedText } from '@/components/themed-text';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, } from 'react';
import { Button, ImageBackground, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import { Picker } from '@react-native-picker/picker';

const backgroundImg = require('../../assets/images/back.jpg');

export default function StartScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ date: string , category: string}>();

  const defaultStyles = useDefaultStyles();
  const [date, setDate] = useState<DateType>();
  const [category, setCategory] = useState();

  const generate =() => {
    const d = dayjs(date).format('YYYY-MM-DD')
    router.push( {
      pathname:'/agenda', 
      params:{ date: d, category: category }
    }
    )
  }

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
            <View style={styles.view}>
        <ThemedText type="title">Agenda</ThemedText>

        <ThemedText type="default">Catégorie</ThemedText>

        <Picker style= {styles.picker}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
          <Picker.Item label="" value="" />
          <Picker.Item label="Foot 11" value="f11" />
          <Picker.Item label="Foot 8" value="f11_ecf" />
          <Picker.Item label="Foot 5" value="FAL" />
        </Picker>
        <ThemedText type="default">Date</ThemedText>
         <DateTimePicker
          styles={ {
            ...defaultStyles,
            today: { borderColor: 'white', borderWidth: 1 },
            selected: { backgroundColor: 'blue', color: 'white' },            
      }}
            mode="single"
            date={date}
            containerHeight={150}
            onChange={({ date }) => setDate(date)}
        /> 
        <TextInput
            style= {styles.input}
            placeholder={dayjs(date).format('MMMM DD YYYY') }
            />
        <Button title="Generate Agenda" disabled={!category} onPress={generate} /> 
        </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image :{
    flex:1,
    //justifyContent: "center"
  },
  view: {
    flex: 1,
    padding: 50,
    gap:15
  },
  select: {
    padding: 20,
    fontSize: 20,
    borderRadius: 10
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white"
  },
  datepicker: {
    backgroundColor: "gray",

  },
  picker: {
    backgroundColor: "white",
    borderRadius: 10,
  }

});
