import { MatchCardProps } from '@/constants/MatchCardProps';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

type ScoreCardProps = {
    matchesData: MatchCardProps;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ matchesData }) => {
    const isBlack = useSharedValue(false);
    const [textColor, setTextColor] = useState('white');

    const { setActions } = useToolBarStore();

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Color',
            icon:  () => <AntDesign name="font-colors" size={24} color="white" />,
            onPress: () => changeColor(),
        }

    ];

    const select = Gesture.Tap().runOnJS(true).onEnd(() => {
        setActions(actions)
    });

    const changeColor = () => {
        isBlack.value = !isBlack.value;
        setTextColor(isBlack.value ? 'black' : 'white')
    };

    return (
        <GestureDetector gesture={Gesture.Exclusive(select)}>
            <View style={styles.logo_box}>
                <Image source={{ uri: `data:image/png;base64,${matchesData.homeIcon_alpha}` }} style={styles.logo_match} />
                <Text style={[styles.text_score, {color: textColor} ]}>{matchesData?.homeScore}</Text>
                <Text style={[styles.text_score, {color: textColor} ]}>-</Text>
                <Text style={[styles.text_score, {color: textColor} ]}>{matchesData?.awayScore}</Text>
                <Image source={{ uri: `data:image/png;base64,${matchesData.awayIcon_alpha}` }} style={styles.logo_match} />
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    logo_box: {
        flexDirection: "row",
        height: 90,
        width: '100%',
        position: 'absolute',
        top: 80,
        left: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 50,
    },
    text_score: {
        fontSize: 60,
        fontWeight: 600,
        fontFamily: 'LatoItalic'
    },
    logo_match: {
        width: 80,
        height: 80,
        margin: 25
    },
})

export default ScoreCard;