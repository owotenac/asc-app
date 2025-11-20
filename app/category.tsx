import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { CategoryProps } from '@/constants/CategoryProps';
import { useAppStore } from '@/constants/filter';
import { ReadTeam } from '@/hooks/firebase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CircleIcon } from '@/components/ui/icon';
import {
    Radio,
    RadioGroup,
    RadioIcon,
    RadioIndicator,
    RadioLabel,
} from '@/components/ui/radio';



export default function CategoryScreen() {
    const router = useRouter();
    const { category, setCategory } = useAppStore();
    const [team, setTeam] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

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
            <Text className="font-bold" size='xl'>Catégorie</Text>
{
           loading ?  (
                <ActivityIndicator size="large" />
            ) :
            (
                <RadioGroup value={category} onChange={setCategory}>
                    <VStack space="2xl">

                        {team.map((team, index) => (
                            <Radio key={index} value={String(team.cp_no)} size='md'>
                                <RadioIndicator>
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>{team.cp_name}</RadioLabel>
                            </Radio>
                        ))}

                    </VStack>
                </RadioGroup>
            )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,
        gap: 20,
        backgroundColor: '#024906ff'
    }

});
