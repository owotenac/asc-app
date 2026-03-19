import AgendaComponent from '@/components/agenda-component';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { ReadDB } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function AgendaF11() {
  const { date } = useAppStore();
  const [matches, setMatches] = useState<MatchCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [homeFilter, setHomeFilter] = useState<boolean>(false);

  const filter = () => {
    setHomeFilter(!homeFilter);
    setLoading(true);
    setMatches([]);
  };

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
    if (date) {
      setLoading(true);
      fetchMatches();
    }
  }, [date, homeFilter]);

  return (
    <View style={styles.container}>

      {/* Filtre domicile */}
      <TouchableOpacity style={styles.filterRow} onPress={filter} activeOpacity={0.7}>
        <Switch
          trackColor={{ false: '#1e2e1f', true: '#1a4a28' }}
          thumbColor={homeFilter ? '#4ade80' : 'rgba(255,255,255,0.4)'}
          ios_backgroundColor="#1e2e1f"
          value={homeFilter}
          onValueChange={filter}
        />
        <Text style={[styles.filterLabel, homeFilter && styles.filterLabelActive]}>
          Matchs à domicile uniquement
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#4ade80" style={{ marginTop: 40 }} />
      ) : (
        <AgendaComponent
          matchesData={matches}
          plateauxData={[]}
          showDetails={true}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a0f0d',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterLabel: {
    color: 'rgb(255, 255, 255)',
    fontSize: 13,
    fontWeight: '500',
  },
  filterLabelActive: {
    color: '#4ade80',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#1a241b',
    marginHorizontal: 16,
    marginBottom: 8,
  },
});