import { useAppStore } from '@/constants/filter';
import { getClassement } from '@/hooks/firebase';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

const backgroundImg = require('../assets/images/0.jpg');

export default function Classement() {

    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const {categoryProps} = useAppStore();

    const API_URL = `https://api-dofa.fff.fr/api/compets/${categoryProps.cp_no}/phases/${categoryProps.cp_phase}/poules/${categoryProps.cp_poule}/classement_journees?page=1`;

        const fetchCalendrier = async () => {
        try {
            const d = await getClassement(API_URL) 
            setData ( d );
            if (d)
                setLoading(false)
        }
       catch (error) {
            console.error("Error fetching matches:", error);
        }

    };

    useEffect(() => {
        //get the classement
        if (!data) {
            fetchCalendrier()
        }
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCalendrier();
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
                <Text style={styles.loadingText}>Loading standings...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Text style={styles.errorSubtext}>Pull down to retry</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No data available</Text>
            </View>
        );
    }

    return (
         <ImageBackground source={backgroundImg} resizeMode="stretch" style={styles.image}>
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, styles.positionCell]}>Pos</Text>
                        <Text style={[styles.headerCell, styles.teamCell]}>Équipe</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>Pts</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>J</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>G</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>N</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>P</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>BP</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>BC</Text>
                        <Text style={[styles.headerCell, styles.smallCell]}>Diff</Text>
                    </View>
                    {!loading ? (
                        <>
                    {data.map((item, index) => {
                        return (
                            <View
                                key={`${index}-${index}`}
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                                ]}
                            >
                                <Text style={[styles.cell, styles.positionCell]}>{item.rank}</Text>
                                <Text style={[styles.cell, styles.teamCell]} numberOfLines={1}>
                                    {item.equipe.short_name || 'N/A'}
                                </Text>
                                <Text style={[styles.cell, styles.smallCell, styles.boldCell]}>{item.point_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.total_games_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.won_games_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.draw_games_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.lost_games_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.goals_for_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>{item.goals_against_count}</Text>
                                <Text style={[styles.cell, styles.smallCell]}>
                                    {/* {item.goals_diff > 0 ? `+${item.goals_diff}` : item.goals_diff} */}
                                    { item.goals_for_count - item.goals_against_count }
                                </Text>
                            </View>
                        );
                    })}
                    </>
                ): null}
                </View>
            </ScrollView>
        </ScrollView >
        </ImageBackground>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 20
        //backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
      image: {
    flex: 1,
   },
    header: {
        backgroundColor: '#0066cc',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 18,
        color: '#cc0000',
        textAlign: 'center',
        marginBottom: 10,
    },
    errorSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    tableContainer: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingVertical: 12,
    },
    headerCell: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    evenRow: {
        backgroundColor: '#fff',
    },
    oddRow: {
        backgroundColor: '#ccccccff',
    },
    cell: {
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    positionCell: {
        width: 40,
    },
    teamCell: {
        width: 150,
        textAlign: 'left',
        paddingLeft: 10,
    },
    smallCell: {
        width: 40,
    },
    boldCell: {
        fontWeight: 'bold',
    },
    positiveCell: {
        color: '#00aa00',
        fontWeight: 'bold',
    },
    negativeCell: {
        color: '#cc0000',
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#999',
    },
});
