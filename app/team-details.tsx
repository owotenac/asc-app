
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import Classement from '@/app/classement';
import TeamAgenda from '@/app/team-agenda';

const renderScene = SceneMap({
    first: TeamAgenda,
    second: Classement,
});

const routes = [
    { key: 'first', title: 'Agenda' },
    { key: 'second', title: 'Classement' },
];



export default function TeamDetails() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const tabChange = (index: number) => {
        setIndex(index)
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TabView
                    style={styles.tabview}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={tabChange}
                    initialLayout={{ width: layout.width, height: layout.height }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            // Fond de la barre
                            style={styles.tabbar}
                            // Fond de l'indicateur (trait sous l'onglet actif)
                            indicatorStyle={styles.indicator}
                            // Label actif
                            activeColor="#4ade80"
                            // Label inactif
                            inactiveColor="rgba(255,255,255,0.3)"
                            // Style du label
                            //labelStyle={styles.label}
                            // Pas de ripple Android
                            android_ripple={{ borderless: true, color: 'rgba(74,222,128,0.1)' }}
                        />
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0f0d',
    },
    tabview: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#0a0f0d',
        borderBottomWidth: 0.5,
        borderBottomColor: '#1a241b',
        elevation: 0,       // supprime l'ombre Android
        shadowOpacity: 0,   // supprime l'ombre iOS
    },
    indicator: {
        backgroundColor: '#4ade80',
        height: 2,
        borderRadius: 2,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.3,
        textTransform: 'none', // évite le ALL CAPS par défaut
    },

});
