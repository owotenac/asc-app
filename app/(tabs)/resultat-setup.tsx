import { useRouter } from 'expo-router';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ReadAndStoreMonitor from '@/components/updatedb';

export default function ResultatSetupScreen() {
    const router = useRouter();

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <ReadAndStoreMonitor></ReadAndStoreMonitor>
                </View>
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
    }

});
