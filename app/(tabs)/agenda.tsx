import AgendaComponent from '@/components/agenda-component';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import WeekScheduler from '@/components/week-scheduler';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { ReadDB } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const backgroundImg = require('../../assets/images/0.jpg');

export default function Agenda() {
  const { date, category } = useAppStore();
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [homeFilter, setHomeFilter] = useState<boolean>(false);

  const filter = () => {
    setHomeFilter( !homeFilter )
    setLoading(true)
    setMatches([])
  }

  const dateChanged = (newDate: Date) => {
    console.log("OnDateChanged " + newDate)
    setLoading(true)
    setMatches([])
  }

  const fetchMatches = async () => {
    console.log("fetchMatches" + homeFilter)
    try {
      const result = await ReadDB(date, category, homeFilter);

      setMatches(result);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching matches:", error);
    }

  };

  useEffect(() => {
    if (date != null) // can be better
      fetchMatches();

  }, [date, homeFilter]); // will force the refresh is date is updated


  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container} >
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
          <View style={styles.container}>
            <WeekScheduler
              onDateChange={dateChanged}
            />
            <HStack style={styles.hstack} space="md">
              <Switch
                trackColor={{ false: '#d4d4d4', true: '#0f4d03ff' }}
                thumbColor="#fafafa"
                value = {homeFilter}
                onToggle= {() => filter()}
              />
              <Text size="md">Matchs à domicile uniquement</Text>
            </HStack>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <AgendaComponent
                matchesData={matches}
                showDetails={true}
              />
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1
  },
  hstack: {
    marginLeft: 30
  }
});