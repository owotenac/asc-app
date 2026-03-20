import FooterWeb from '@/components/footer';
import { TeamCard } from '@/components/team-card';
import { CategoryProps } from '@/constants/CategoryProps';
import { asc_background } from "@/constants/theme";
import { ReadTeam } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

    if (teams.length == 0) fetchTeam();
  }, []);

  const currentTeams = teams.filter(team => team.current);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
 
          <View>
            <Text style={styles.clubName}>AS Canet</Text>
            <Text style={styles.clubSeason}>SAISON 2025 / 2026</Text>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Content ── */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="#4ade80" style={{ marginTop: 40 }} />
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Compétitions en cours</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{currentTeams.length}</Text>
                </View>
              </View>

              {/* 2-column grid */}
              <View style={styles.grid}>
                {currentTeams.map((team, index) => (
                  <View key={index} style={styles.gridItem}>
                    <TeamCard {...team} />
                  </View>
                ))}
              </View>
          <FooterWeb/>
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
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  badge: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:  {
    width: 45, 
    height: 45
  },
  badgeText: {
    color: '#0d4a1a',
    fontSize: 16,
    fontFamily: 'Exo2Italic',
    letterSpacing: 1,
  },
  clubName: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Exo2Italic',
    letterSpacing: 2,
    lineHeight: 24,
  },
  clubSeason: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
  },

  divider: {
    height: 0.5,
    backgroundColor: '#1a241b',
    marginHorizontal: 0,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 14,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Exo2Italic',
    letterSpacing: 2,
  },
  countBadge: {
    backgroundColor: '#1a2e1c',
    borderWidth: 0.5,
    borderColor: '#2a4e2c',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  countText: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '48.5%',
  },
});