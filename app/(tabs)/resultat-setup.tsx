import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ReadAndStoreMonitor from '@/components/updatedb';



import { useAppStore } from '@/constants/filter';
import * as ImagePicker from 'expo-image-picker';



export default function ResultatSetupScreen() {
    const router = useRouter();
    const { date, setDate } = useAppStore();
    const { categoryProps } = useAppStore();
    const [image, setImage] = useState<string | null>(null);

    const generateResult = () => {
        router.push({
            pathname: '/resultat',
            params: { image: image }
        }
        )
    }

    const generateAffiche = () => {
        router.push({
            pathname: '/affiche',
            params: { image: image }
        }
        )
    }

    const chooseCategory = () => {
        router.push({
            pathname: '/category'
        }
        );
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <ReadAndStoreMonitor></ReadAndStoreMonitor>
                </View>
                {/* </ImageBackground> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#024906ff'
    },
    view: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    pressable: {
        marginBottom: 10,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        paddingVertical: 8,
    }

});
