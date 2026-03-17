import AgendaComponent from '@/components/agenda-component';
import { useAppStore } from '@/constants/filter';
import { PlateauCardProps } from '@/constants/MatchCardProps';
import { ReadDBPlateau } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
    if (date) {
      setLoading(true)    
      fetchMatches();
    }

  }, [date]); // will force the refresh is date is updated


  return (
      <View style={styles.container} >
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
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000ff',
  },
  image: {
    flex: 1
  }
});