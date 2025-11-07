import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Classement() {

    return (
       <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        </SafeAreaProvider>
 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#024906ff',
        verticalAlign: 'middle'
    },
    box: {
        margin: 10,
        paddingTop: 10,
        paddingBottom: 30,
        justifyContent: "center"
    }

});