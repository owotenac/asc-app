
import WeekScheduler from '@/components/week-scheduler';
import { useAppStore } from '@/constants/filter';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import AgendaF11 from '@/app/agenda-f11';
import AgendaFAL from '@/app/agenda-fal';

const renderScene = SceneMap({
    first: AgendaF11,
    second: AgendaFAL,
});

const routes = [
    { key: 'first', title: 'Agenda' },
    { key: 'second', title: 'Agenda Loisirs' },
];



export default function FullAgenda() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const { categoryProps } = useAppStore();

    const router = useRouter();

    const tabChange = (index: number) => {
        setIndex(index)
    }

  const dateChanged = (newDate: Date) => {
    //setLoading(true)
    //setMatches([])
  }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <WeekScheduler
              onDateChange={dateChanged}
            />
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
        //backgroundColor: "black",
        verticalAlign: 'middle'
    },
    tabbar: {
        backgroundColor: "black",
    },
    tabview: {
        flex: 1
    }

});
