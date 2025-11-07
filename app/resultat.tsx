
import TeamImage from '@/components/team-image';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { ReadDB } from '@/hooks/firebase';
import React, { useState } from 'react';

const backgroundImg = require('../assets/images/0.jpg');

export default function Resultat() {
  const { date, category, image } = useLocalSearchParams<{ date: string; category: string, image: string}>();
  const [loading, setLoading] = useState(true);

  const teamImg = {uri: image};


//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const result = await ReadDB( date , category);
//         setMatches(result);
     
//         setLoading(false);

//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       } 
     
//     };

//     fetchMatches();
//   }, []);


  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container} >
        <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
          <GestureHandlerRootView  >
            <TeamImage imgSource={teamImg} imageSize={300}/>
            {/* <ScrollView> 
                { loading && 
                    <ActivityIndicator size="large" />
                } 

                  {matches.map((match, index) => (
                    <MatchCard key={index} {...match} />
                  ))}
            </ScrollView> */}
          </GestureHandlerRootView >
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
  image: {
    flex: 1,
    //height: 1350
    //justifyContent: "center"
  }
});