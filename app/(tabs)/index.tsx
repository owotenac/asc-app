import { TeamCard } from '@/components/team-card';
import { CategoryProps } from '@/constants/CategoryProps';
import { ReadTeam } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { asc_background } from "@/constants/theme";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';

export default function StartScreen() {
  const [teams, setTeams] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const result = await ReadTeam();
        setTeams(result);

        setLoading(false);

      } catch (error) {
        console.error("Error fetching team:", error);
      }

    };

    if (teams.length == 0)
      fetchTeam();
  }, []);

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <Text style={styles.chapter}>Competition en cours</Text>
              {teams
                .filter(team => team.current)
                .map((team, index) => (
                  <TeamCard key={index} {...team} />
                ))}
              <Text style={styles.chapter}>Compétitions passées</Text>
              {teams
                .filter(team => !team.current)
                .map((team, index) => (
                  <TeamCard key={index} {...team} />
                ))}
            </>
          )}
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
  },
  chapter: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Exo2Italic',
    marginBottom: 10,
    backgroundColor: 'rgb(11, 29, 7)',
    padding: 10,
    borderRadius: 10,
  }
});
