import { TeamCard } from '@/components/team-card';
import { CategoryProps } from '@/constants/CategoryProps';
import { ReadTeam } from '@/hooks/firebase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { asc_background } from "@/constants/theme";
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

export default function StartScreen() {
  const router = useRouter();
  const [team, setTeam] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const result = await ReadTeam( );
        setTeam(result);
     
        setLoading(false);

      } catch (error) {
        console.error("Error fetching team:", error);
      } 
     
    };

    fetchTeam();
  }, []);

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
            <ScrollView>           
                { loading && 
                    <ActivityIndicator size="large" />
                } 

                  {team.map((team, index) => (
                    <TeamCard key={index} {...team} />
                  ))}
          </ScrollView> 

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: asc_background,
    padding: 20
  }
});
