import AfficheBase from '@/components/affiche-base';
import MatchCardProgram from '@/components/match-card-program';
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import PlateauCardProgram from '@/components/plateau-card-program';
import { useAppStore } from '@/constants/filter';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function Program() {

    const { selectedMatches, selectedPlateaux } = useAppStore()

    const { setActions } = useToolBarStore();
    const router = useRouter();

    const selectTeam = () => {
        router.push({
            pathname: '/team-selection'
        })

    };

    useEffect(() => {
    }, [selectedMatches, selectedPlateaux]);

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Select Team',
            icon: () => <AntDesign name="control" size={24} color="white" />,
            onPress: () => selectTeam(),
        }
    ];

    return (

        <AfficheBase
            verticalText='PROGRAMME DU WEEKEND'
            actionToAdd={actions}
            showVertialText={false}>

            <View style={styles.child}>
            <MovableText text='PROGRAMME DU
                    WEEK-END'/>

            <TouchableOpacity onPress={() => setActions(actions)}>
                {selectedMatches.length > 0 ? (
                    <MovableView
                        initialPosition={220}>
                        <FlatList style={styles.list}
                            data={selectedMatches}
                            extraData={selectedMatches}
                            numColumns={1}
                            renderItem={
                                ({ item }) => (
                                    <MatchCardProgram
                                        match={item}
                                    />
                                )
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </MovableView>
                ) :

                    <MovableView
                        initialPosition={20}>
                        <FlatList style={styles.list}
                            data={selectedPlateaux}
                            extraData={selectedPlateaux}
                            numColumns={1}
                            renderItem={
                                ({ item }) => (
                                    <PlateauCardProgram
                                        match={item}
                                    />
                                )
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </MovableView>


                }
            </TouchableOpacity>
            </View>
        </AfficheBase>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        left: 0,
        //alignItems: 'center',
        //justifyContent: 'center',
        //verticalAlign: 'middle',
        margin: 10,
    },
    imageWrapper: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: 200,
        height: 150,
        margin: 10,
        borderRadius: 8,
    },
    list: {
        flex: 1,
        gap: 10,
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "LatoItalic",
        textAlign: 'center'
    }, 
    child: { 
        flex:1,
        width:screenWidth,
        position: 'absolute',
        top: 1
    }
})


