import TeamImage from '@/components/team-image';
import Toolbar from '@/components/toolbar';
import { useAppStore } from '@/constants/filter';
import { pickImage } from '@/constants/image';
import { global_styles } from '@/constants/theme';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import { GetMatchFromDB } from '@/hooks/firebase';
import * as ScreenShot from '@/hooks/screenshot';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import SponsorsComponent from './sponsors-component';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const captureWidth = screenWidth;
const captureHeight = (screenWidth / 4) * 5; // 4:5 ratio

interface AfficheBaseProps {
    children: ReactNode;
    isResultat: boolean
}


const AfficheBase = ({ children, isResultat }: AfficheBaseProps) => {

    const { categoryProps, matchProps, setMatchProps } = useAppStore();
    const { date } = useAppStore();
    const [loading, setLoading] = useState(true);
    const viewShotRef = useRef<ViewShot>(null);
    const [imgSrc, setImgSrc] = useState<string>();
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
            label: 'Share',
            icon: () => <Entypo name="share" size={24} color="white" />,
            onPress: () => share(),
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
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        if (!matchProps)
            fetchMatches();
        else
            setLoading(false)

    }, []);

    const share = () => {
        console.log("share")
    }
    const screenShot = async () => {
        if (viewShotRef)
            ScreenShot.screenShot(viewShotRef)
    };

    const select = () => {
        setActions(actions)
    }

    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container} >
                <GestureHandlerRootView  >

                    <ViewShot ref={viewShotRef}
                        style={{
                            width: captureWidth,
                            height: captureHeight,
                            overflow: 'hidden', // Clips content that exceeds bounds
                        }}
                        options={{
                            format: 'png',
                            quality: 1,
                        }}
                    >
                        <TeamImage />
                        <View style={global_styles.left_box}>
                            <Text style={global_styles.text_vertical}>{isResultat ? ("RESULTAT DU WEEKEND") : ("AFFICHE DU WEEKEND")}</Text>
                        </View>
                        {
                            loading ? (
                                <ActivityIndicator size="large" />
                            ) :
                                (
                                    <>
                                        {children}
                                    </>
                                )
                        }
                    <SponsorsComponent />
                    </ViewShot>
                    <View style={global_styles.captureArea}></View>
                    <Pressable style={styles.touch} onPress={select}/>
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
    }

});