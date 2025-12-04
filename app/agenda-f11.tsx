import AgendaComponent from '@/components/agenda-component';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { ReadDB } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';

const backgroundImg = require('../assets/images/0.jpg');

export default function AgendaF11() {
  const { date } = useAppStore();
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [homeFilter, setHomeFilter] = useState<boolean>(false);

  const filter = () => {
    setHomeFilter( !homeFilter )
    setLoading(true)
    setMatches([])
  }

  const fetchMatches = async () => {
    try {
      const result = await ReadDB(date, homeFilter);
      setMatches(result);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching matches:", error);
    }

  };

  useEffect(() => {
      setLoading(true)
      if (date != null) // can be better
        fetchMatches();

  }, [date, homeFilter]); // will force the refresh is date is updated


  return (
      <View style={styles.container} >
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
          <View style={styles.container}>
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
                plateauxData={[]}
                showDetails={true}
              />
            )}
          </View>
        </ImageBackground>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  image: {
    flex: 1
  },
  hstack: {
    marginLeft: 30
  }
});