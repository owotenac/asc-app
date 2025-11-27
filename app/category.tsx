import { VStack } from '@/components/ui/vstack';
import { CategoryProps } from '@/constants/CategoryProps';
import { useAppStore } from '@/constants/filter';
import { ReadTeam } from '@/hooks/firebase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




export default function CategoryScreen() {
    const router = useRouter();
    const { categoryProps, setCategoryProps } = useAppStore();
    const [team, setTeam] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const select = (team: CategoryProps) => {
        setCategoryProps(team)
        router.back()
    }

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const result = await ReadTeam();
               
                setTeam(result);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching team:", error);
            }

        };

        fetchTeam();
    }, []);
    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.view}>
                {
                    loading ? (
                        <ActivityIndicator size="large" />
                    ) :
                        (
                            <VStack space="md">
                                {team.map((team, index) => (
                                    <TouchableOpacity key={index} onPress={() => select(team)} style={styles.button}>
                                        <Text style={{color:"white"}}>{team.cp_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </VStack>
                        )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
        gap: 10,
        backgroundColor: '#024906ff'
    },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 2,
        backgroundColor: 'black',
        padding: 10
    }

});
