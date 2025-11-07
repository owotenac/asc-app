import { MatchCardProps } from '@/constants/MatchCardProps';
import React, { useEffect, useState } from 'react';
import { MatchCard } from './match-card';

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

    // State management
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState<MatchCardProps[]>([]);
    // Side effects
    useEffect(() => {
        // Component did mount / update logic
        setMatches(matchesData);
        setLoading(false)
        // Cleanup function
        return () => {
            // Cleanup logic
        };
    }, []);

    // Render
    return (
        <View style={styles.container}>
            {/* <ScrollView >
                {!loading &&
                 (matchesData.map((match, index) => (
                    <MatchCard key={index}  {...match} showDetails={showDetails}/>
                )))
            }
            </ScrollView> */}

            <FlatList
                data={matchesData}
                renderItem={({ item }) => (
                    <MatchCard {...item} showDetails={showDetails} />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    loading ? <ActivityIndicator size="large" /> : null
                }
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1
        //backgroundColor: 'white'
    }
});

export default AgendaComponent;