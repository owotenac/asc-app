import AgendaComponent from '@/components/agenda-component';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppStore } from '@/constants/filter';
import { ReadTeamAgenda } from '@/hooks/firebase';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function TeamAgenda() {
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryProps } = useAppStore();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const result = await ReadTeamAgenda( categoryProps );
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
    <>
    {categoryProps && 
      <Stack.Screen options={{ title: categoryProps.cp_name }} />
    }
        <View style={styles.back}>
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
        </View>
    </>        
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    //alignItems: 'center',
        //justifyContent: "center"
  },
  back: {
    flex: 1,
    backgroundColor: '#000000ff',
   }
});