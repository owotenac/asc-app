import { useAppStore } from '@/constants/filter';
import { getClassement } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Classement() {

    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { categoryProps } = useAppStore();

    const API_URL = `https://api-dofa.fff.fr/api/compets/${categoryProps.cp_no}/phases/${categoryProps.cp_phase}/poules/${categoryProps.cp_poule}/classement_journees?page=1`;

    const fetchCalendrier = async () => {
        try {
            const d = await getClassement(API_URL);
            setData(d);
            if (d) setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching matches:", error);
        }
    };

    useEffect(() => {
        if (!data) fetchCalendrier();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCalendrier();
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4ade80" />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Données indisponibles</Text>
            </View>
        );
    }

    const isCanet = (name: string) =>
        name?.toUpperCase().includes('CANET');

    const getDiffStyle = (diff: number) => {
        if (diff > 0) return styles.diffPos;
        if (diff < 0) return styles.diffNeg;
        return styles.diffZero;
    };

    const formatDiff = (diff: number) =>
        diff > 0 ? `+${diff}` : `${diff}`;

    const getPosStyle = (rank: number) => {
        if (rank === 1) return styles.pos1;
        if (rank === 2) return styles.pos2;
        if (rank === 3) return styles.pos3;
        return null;
    };

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4ade80"
                    />
                }
            >
                {/* En-tête colonnes */}
                <View style={styles.colHeader}>
                    <Text style={[styles.hPos]}>Pos</Text>
                    <Text style={[styles.hTeam]}>Équipe</Text>
                    <Text style={[styles.hPts]}>Pts</Text>
                    <Text style={[styles.hStat]}>J</Text>
                    <Text style={[styles.hStat]}>G</Text>
                    <Text style={[styles.hStat]}>N</Text>
                    <Text style={[styles.hStat]}>P</Text>
                    <Text style={[styles.hStat]}>BP</Text>
                    <Text style={[styles.hStat]}>BC</Text>
                    <Text style={[styles.hDiff]}>Diff</Text>
                </View>

                {data.map((item, index) => {
                    const canet = isCanet(item.equipe.short_name);
                    const diff = item.goals_for_count - item.goals_against_count;

                    return (
                        <View
                            key={index}
                            style={[styles.row, canet && styles.rowCanet]}
                        >
                            {/* Position */}
                            <View style={[styles.posBadge, getPosStyle(item.rank)]}>
                                <Text style={[
                                    styles.posText,
                                    canet && !getPosStyle(item.rank) && styles.posTextCanet,
                                    item.rank <= 3 && styles.posTextPodium,
                                ]}>
                                    {item.rank}
                                </Text>
                            </View>

                            {/* Équipe */}
                            <Text
                                style={[styles.teamName, canet && styles.teamNameCanet]}
                                numberOfLines={1}
                            >
                                {item.equipe.short_name || 'N/A'}
                            </Text>

                            {/* Points */}
                            <Text style={[styles.pts, canet && styles.ptsCanet]}>
                                {item.point_count}
                            </Text>

                            {/* Stats */}
                            <Text style={styles.stat}>{item.total_games_count}</Text>
                            <Text style={styles.stat}>{item.won_games_count}</Text>
                            <Text style={styles.stat}>{item.draw_games_count}</Text>
                            <Text style={styles.stat}>{item.lost_games_count}</Text>
                            <Text style={styles.stat}>{item.goals_for_count}</Text>
                            <Text style={styles.stat}>{item.goals_against_count}</Text>

                            {/* Diff */}
                            <Text style={[styles.diff, getDiffStyle(diff)]}>
                                {formatDiff(diff)}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0f0d',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    centerContainer: {
        flex: 1,
        backgroundColor: '#0a0f0d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 14,
    },

    // En-tête colonnes
    colHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#1a241b',
        marginBottom: 4,
    },
    hPos:  { width: 28, fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 },
    hTeam: { flex: 1, fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 },
    hPts:  { width: 30, textAlign: 'center', fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5 },
    hStat: { width: 24, textAlign: 'center', fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 },
    hDiff: { width: 28, textAlign: 'center', fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 },

    // Ligne
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 3,
    },
    rowCanet: {
        backgroundColor: 'rgba(74,222,128,0.07)',
        borderWidth: 0.5,
        borderColor: 'rgba(74,222,128,0.2)',
    },

    // Position
    posBadge: {
        width: 22, height: 22,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    pos1: { backgroundColor: 'rgba(251,191,36,0.15)' },
    pos2: { backgroundColor: 'rgba(180,180,190,0.12)' },
    pos3: { backgroundColor: 'rgba(180,120,60,0.12)' },
    posText: {
        fontSize: 12, fontWeight: '600',
        color: 'rgba(255,255,255,0.35)',
    },
    posTextCanet: { color: '#4ade80' },
    posTextPodium: { fontWeight: '700' },

    // Équipe
    teamName: {
        flex: 1,
        fontSize: 12, fontWeight: '500',
        color: 'rgba(255,255,255,0.65)',
        paddingRight: 6,
    },
    teamNameCanet: {
        color: '#4ade80',
        fontWeight: '600',
    },

    // Points
    pts: {
        width: 30, textAlign: 'center',
        fontSize: 13, fontWeight: '700',
        color: '#ffffff',
    },
    ptsCanet: { color: '#4ade80' },

    // Stats
    stat: {
        width: 24, textAlign: 'center',
        fontSize: 12,
        color: 'rgba(255,255,255,0.35)',
    },

    // Diff
    diff: {
        width: 28, textAlign: 'center',
        fontSize: 12, fontWeight: '600',
    },
    diffPos:  { color: '#4ade80' },
    diffNeg:  { color: '#f87171' },
    diffZero: { color: 'rgba(255,255,255,0.3)' },
});