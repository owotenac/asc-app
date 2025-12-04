import AgendaComponent from '@/components/agenda-component';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';

import { useAppStore } from '@/constants/filter';
import { ReadTeamAgenda } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';

const backgroundImg = require('../assets/images/0.jpg');

export default function TeamAgenda() {
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryProps } = useAppStore();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const result = await ReadTeamAgenda( categoryProps.cp_no );
        setMatches(result);
     
        setLoading(false);

      } catch (error) {
        console.error("Error fetching matches:", error);
      } 
     
    };

    if (categoryProps != null) // can be better
      fetchMatches();

  }, []);


  return (
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <AgendaComponent 
              matchesData={matches}
              plateauxData={[]}
              showDetails={false}
              />
            )}
          </View>
        </ImageBackground>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    //alignItems: 'center',
        //justifyContent: "center"
  },
  image: {
    flex: 1,
   }
});