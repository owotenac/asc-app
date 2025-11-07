import { Center } from '@/components/ui/center';

import { Heading } from '@/components/ui/heading';
import { useAppStore } from '@/constants/filter';
import { asc_background } from "@/constants/theme";
import { useRouter } from 'expo-router';
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
    const { category } = useAppStore();

    const router = useRouter();

    const tabChange = (index: number) => {
        console.log("tabChanged" + index)
        setIndex(index)
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Center style={styles.box}>
                    <Heading size='2xl'>{category}</Heading>
                </Center>

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
        verticalAlign: 'middle'
    },
    box: {
        margin: 10,
        paddingTop: 10,
        justifyContent: "center"
    },
    tabbar: {
        backgroundColor: asc_background,
    },
    tabview: {
        flex: 1
    }

});
