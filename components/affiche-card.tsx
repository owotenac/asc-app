import { MatchCardProps } from '@/constants/MatchCardProps';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

type AfficheCardProps = {
    matchesData: MatchCardProps;
};

const AfficheCard: React.FC<AfficheCardProps> = ({ matchesData }) => {
    const isBlack = useSharedValue(false);
    const [textColor, setTextColor] = useState('white');

    const { setActions } = useToolBarStore();

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Color',
            icon: () => <AntDesign name="font-colors" size={24} color="white" />,
            onPress: () => changeColor(),
        }

    ];

    const changeColor = () => {
        isBlack.value = !isBlack.value;
        setTextColor(isBlack.value ? 'black' : 'white')
    };

    return (
         <TouchableOpacity onPress={() => setActions(actions)}>
            <View style={styles.global_box}>
                <View style={styles.logo_box}>
                    <Image source={matchesData.homeIcon_alpha} style={styles.logo_match} />
                    <Image source={matchesData.awayIcon_alpha} style={styles.logo_match} />
                </View>
                <View style={styles.logo_box}>
                    <Text style={[styles.text_team, { color: textColor }]}>{matchesData?.home}</Text>
                    <Text style={[styles.text_team, { color: textColor }]}>/</Text>
                    <Text style={[styles.text_team, { color: textColor }]}>{matchesData?.away}</Text>
                </View>
            </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    global_box: {
        flexDirection: "column",
        width: '100%',
        //alignItems: 'center',
        //justifyContent: 'space-between',
        paddingLeft: 60,
        paddingRight: 60
    },    
    logo_box: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15
    },
    text_team: {
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'LatoBlackItalic'
    },
    logo_match: {
        width: 80,
        height: 80,
        margin: 25
    },
})

export default AfficheCard;