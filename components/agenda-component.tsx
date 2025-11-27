import { Pressable } from '@/components/ui/pressable';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import ActionSheetCustom from './action-sheet';
import MatchCard from './match-card';


import {
    ActivityIndicator,
    //ScrollView,
    FlatList,
    StyleSheet, View
} from 'react-native';

type AgendaComponentProps = {
    matchesData: MatchCardProps[];
    showDetails: boolean
};

const AgendaComponent: React.FC<AgendaComponentProps> = ({ matchesData, showDetails }) => {

    const actionSheetRef = useRef<{ setShow: () => void } | null>(null);

    // State management
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState<MatchCardProps[]>([]);
    const { setMatchProps } = useAppStore();

    const router = useRouter();

    // Side effects
    useEffect(() => {
        setMatches(matchesData);
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

