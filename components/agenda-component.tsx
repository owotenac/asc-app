import { Pressable } from '@/components/ui/pressable';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps, PlateauCardProps } from '@/constants/MatchCardProps';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import ActionSheetCustom from './action-sheet';
import MatchCard from './match-card';
import PlateauCard from './plateau-card';


import {
    ActivityIndicator,
    //ScrollView,
    FlatList,
    StyleSheet, View
} from 'react-native';

type AgendaComponentProps = {
    matchesData: MatchCardProps[];
    plateauxData: PlateauCardProps[];
    showDetails: boolean
};

const AgendaComponent: React.FC<AgendaComponentProps> = ({ matchesData, plateauxData, showDetails }) => {

    const actionSheetRef = useRef<{ setShow: () => void } | null>(null);

    // State management
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState<MatchCardProps[]>([]);
    const [plateaux, setPlateaux] = useState<PlateauCardProps[]>([]);
    const { setMatchProps } = useAppStore();

    const router = useRouter();

    // Side effects
    useEffect(() => {
        setMatches(matchesData);
        setPlateaux(plateauxData)
        setLoading(false)

        return () => {
            // Cleanup logic
        };
    }, []);

    const select = (item: MatchCardProps) => {
        setMatchProps(item)
        actionSheetRef.current?.setShow();
    }

    // Render
    return (
        <>
            <View style={styles.container}>
                { matchesData.length >0  ? (
                <FlatList
                    data={matchesData}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => select(item)}>
                            <MatchCard match={item} showDetails={showDetails} />
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        loading ? <ActivityIndicator size="large" /> : null
                    }
                />
                ): (
                <FlatList
                    data={plateaux}
                    renderItem={({ item }) => (
                        <PlateauCard match={item}/>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        loading ? <ActivityIndicator size="large" /> : null
                    }
                />
                )
            }
            </View>
            <ActionSheetCustom ref={actionSheetRef} />


        </>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1
        //backgroundColor: 'white'
    }
});

export default AgendaComponent;

