
import { useAppStore } from '@/constants/filter';
import { asc_background } from "@/constants/theme";
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
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
    const { categoryProps } = useAppStore();

    const router = useRouter();

    const tabChange = (index: number) => {
        setIndex(index)
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_team}>{categoryProps.cp_name}</Text>
                </View>

                <TabView style={styles.tabview}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={tabChange}
                    initialLayout={{ width: layout.width, height: layout.height }}
                    renderTabBar={props => <TabBar {...props} style={styles.tabbar} />}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: asc_background,
        //verticalAlign: 'middle'
    },
    header: {
        margin: 5,
    },
    text_team: {
        color: "#fff",
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Exo2"
    },
    tabbar: {
        backgroundColor: asc_background,
    },
    tabview: {
        flex: 1
    }

});
