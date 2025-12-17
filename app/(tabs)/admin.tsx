import { useRouter } from 'expo-router';

import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import FirebaseStatusMonitor from '@/components/firebase-monitor';

export default function AdminScreen() {
    const router = useRouter();

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.view}>
                    <Button title="Generate Sponsors" onPress={() => router.push('/sponsors')} />
                    <FirebaseStatusMonitor></FirebaseStatusMonitor>
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
