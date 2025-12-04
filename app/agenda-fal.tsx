import AgendaComponent from '@/components/agenda-component';
import { useAppStore } from '@/constants/filter';
import { PlateauCardProps } from '@/constants/MatchCardProps';
import { ReadDBPlateau } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';

const backgroundImg = require('../assets/images/0.jpg');

export default function AgendaFAL() {
  const { date } = useAppStore();
  const [plateaux, setPlateaux] = useState<PlateauCardProps[]>([]);  
  const [loading, setLoading] = useState(true);

  const filter = () => {
    setLoading(true)
    setPlateaux([])
  }

  const fetchMatches = async () => {
    try {
      const p = await ReadDBPlateau(date);
      setPlateaux(p);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching matches:", error);
    }

  };

  useEffect(() => {
    setLoading(true)    
    if (date != null) // can be better
      fetchMatches();

  }, [date]); // will force the refresh is date is updated


  return (
      <View style={styles.container} >
        <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
          <View style={styles.container}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <AgendaComponent
                matchesData={[]}
                plateauxData={plateaux}
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
    flexDirection: 'column'
  },
  image: {
    flex: 1
  }
});