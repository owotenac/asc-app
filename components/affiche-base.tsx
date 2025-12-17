import TeamImage from '@/components/team-image';
import Toolbar from '@/components/toolbar';
import { useAppStore } from '@/constants/filter';
import { pickImage } from '@/constants/image';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import { GetMatchFromDB } from '@/hooks/firebase';
import * as ScreenShot from '@/hooks/screenshot';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import React, { ReactNode, useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const captureWidth = screenWidth;
const captureHeight = (screenWidth / 4) * 5; // 4:5 ratio

interface AfficheBaseProps {
    children: ReactNode;
    verticalText: string
    showVertialText?: boolean;
    actionToAdd?: Action[]
    showTeamImage?: boolean
}


const AfficheBase = ({ children, verticalText, showVertialText, actionToAdd, showTeamImage = true }: AfficheBaseProps) => {

    const { categoryProps, matchProps, setMatchProps } = useAppStore();
    const { date } = useAppStore();
    const viewShotRef = useRef<ViewShot>(null);
    const { setActions } = useToolBarStore();

    // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
    //   "granularPermissions": [
    //     "photo",
    //     "audio"
    //   ]
    // });
    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Image',
            icon: () => <Entypo name="image" size={24} color="white" />,
            onPress: () => pickImage(),
        },
        {
            label: 'ScreenShot',
            icon: () => <MaterialIcons name="screenshot" size={24} color="white" />,
            onPress: () => screenShot(),
        }

    ];

    useEffect(() => {
        //retreive matchs
        const fetchMatches = async () => {
            try {
                const result = await GetMatchFromDB(date, String(categoryProps.cp_no));

                if (!result) {
                    throw ('No Match found')
                }

                setMatchProps(result);
            }
            catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        if (!matchProps)
            fetchMatches();

    }, []);

    const screenShot = async () => {
        if (viewShotRef)
            ScreenShot.screenShot(viewShotRef)
    };

    const select = () => {
        const newActions = actionToAdd
            ? actions.concat(actionToAdd)  // concat returns new array
            : actions;
        setActions(newActions);
    }

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container} >
                <GestureHandlerRootView >

                    <ViewShot ref={viewShotRef}
                        style={{
                            width: captureWidth,
                            height: captureHeight,
                            overflow: 'visible', // Clips content that exceeds bounds
                        }}
                        options={{
                            format: 'png',
                            quality: 1,
                        }}
                    >
                        { showTeamImage ? (
                        <TeamImage />
                        ):null
                        }
                        {showVertialText ? (
                            <View style={styles.left_box}>
                                <Text style={styles.text_vertical}>{verticalText}</Text>
                            </View>
                        ) : null}

                        {children}


                    </ViewShot>
                    <View style={styles.captureArea}></View>
                    <Pressable style={styles.touch} onPress={select} />
                    <Toolbar></Toolbar>
                </GestureHandlerRootView >
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default AfficheBase


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touch: {
        flex: 1
        //minHeight : 
    },
    text_vertical: {
        color: '#ffffff40',
        fontSize: 35,
        textAlign: "center",
        transformOrigin: 'center',
        fontFamily: 'LatoItalic'
    },
    left_box: {
        position: 'absolute',
        top: 250,
        left: (-screenHeight / 2) + 55,
        width: screenHeight,
        height: 100,
        transform: [{ rotate: '-90deg' }],
    },
    captureArea: {
        position: 'absolute',
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderWidth: 1,
        top: screenWidth / 0.8,
        height: 1,
        width: '100%'
    },
    child: {
        flex: 1,
        //position: 'absolute'
        //top:0,
        //left:0
    }

});