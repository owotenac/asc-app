import { LeftBox } from '@/components/left-box';
import { MatchCard } from '@/components/match-card';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ReadDB } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';

const backgroundImg = require('../assets/images/0.jpg');

export default function Agenda() {
  const { date, category } = useLocalSearchParams<{ date: string; category: string }>();
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const result = await ReadDB( date , category);
        setMatches(result);
     
        setLoading(false);

      } catch (error) {
        console.error("Error fetching matches:", error);
      } 
     
    };

    fetchMatches();
  }, []);


  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container} >
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
          <View style={styles.main_container}>
            <LeftBox></LeftBox>
            <ScrollView> 
                { loading && 
                    <ActivityIndicator size="large" />
                } 

                  {matches.map((match, index) => (
                    <MatchCard key={index} {...match} />
                  ))}
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#25292e',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  main_container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    //height: 1350
    //justifyContent: "center"
  }
});