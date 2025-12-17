import { useAppStore } from '@/constants/filter';
import { MatchCardProps, PlateauCardProps } from '@/constants/MatchCardProps';
import { ReadDB, ReadDBPlateau } from '@/hooks/firebase';

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function TeamSelection () {

    const [numMatches, setNumMatches] = useState(new Set<number>);
    const [numPlateau, setNumPlateau] = useState(new Set<number>);
    const [competitionList, setCompetitionList] = useState<MatchCardProps[]>([]) //all matches at a date
    const [plateauList, setPlateauList] = useState<PlateauCardProps[]>([]) //all matches at a date
    const {date, setSelectedMatches, setSelectedPlateaux}= useAppStore()
    const router = useRouter();

    const fetchMatches = async () => {
        try {
            //get competition
            const result = await ReadDB(date, false);
            setCompetitionList(result);
            //get plateaux
            const resultPlateau = await ReadDBPlateau(date)
            setPlateauList(resultPlateau)

        } catch (error) {
            console.error("Error fetching matches:", error);
        }

    };

    useEffect(() => {
        if (date != null) // can be better
            fetchMatches();
    }, []);

    const toggleSwitchCompetition = (index: number) => {
        setNumMatches(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

        const toggleSwitchPlateau = (index: number) => {
        setNumPlateau(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const close = () => {
        const m2: MatchCardProps[] = competitionList.filter(match =>
            numMatches.has(match.CompetitionID)
        );
        setSelectedMatches(Array.from(m2))

        const p2: PlateauCardProps[] = plateauList.filter(plateau =>
            numPlateau.has(plateau.CompetitionID)
        );
        setSelectedPlateaux(Array.from(p2))

        router.back();
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                <View style={styles.container}>
                    <Text style={styles.categorie}>Competitions</Text>
                    {competitionList.length >0 ? (
                        <ScrollView style={styles.list}>
                            <View style={styles.gridContainer}>
                                {competitionList.map((item, index) => (
                                    <View style={styles.item} key={item.CompetitionID || index}>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                            thumbColor={numMatches.has(item.CompetitionID) ? '#f5dd4b' : '#f4f3f4'}
                                            onValueChange={() => toggleSwitchCompetition(item.CompetitionID)}
                                            value={numMatches.has(item.CompetitionID)}
                                        />
                                        <Text style={styles.text_item}>{item.Competition}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    ): (
                    <Text style={styles.errorMessage}>Pas de match à cette date {date.toLocaleDateString()}</Text>
                    )
                    }
                    <Text style={styles.categorie}>Plateaux</Text>
                    {plateauList.length >0 ? (
                        <ScrollView style={styles.list}>
                            <View style={styles.gridContainer}>
                                {plateauList.map((item, index) => (
                                    <View style={styles.item} key={item.CompetitionID || index}>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                            thumbColor={numPlateau.has(item.CompetitionID) ? '#f5dd4b' : '#f4f3f4'}
                                            onValueChange={() => toggleSwitchPlateau(item.CompetitionID)}
                                            value={numPlateau.has(item.CompetitionID)}
                                        />
                                        <Text style={styles.text_item}>{item.Competition}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    ): (
                    <Text style={styles.errorMessage}>Pas de plateau à cette date {date.toLocaleDateString()}</Text>
                    )
                    }                    
                    <Button title="Apply" onPress={() => close()} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        color: 'white',
        backgroundColor: 'black',
        gap: 5
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
        margin: 10,
        gap: 10,
    },
    text_item: {
        color: 'white',
    },
    list: {
        borderColor: 'white',
        borderWidth:1,
        borderRadius:5,
        backgroundColor: "#2b2a2aff"
    },
    errorMessage: {
        flex:1,
        color: "white"
    },
    categorie: {
        color: 'white',
        fontSize: 25
    }
});
