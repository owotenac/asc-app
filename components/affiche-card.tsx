import { MatchCardProps } from '@/constants/MatchCardProps';
import { Action, useToolBarStore } from '@/constants/toolbarprovider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

type AfficheCardProps = {
    matchesData: MatchCardProps;
};

const AfficheCard: React.FC<AfficheCardProps> = ({ matchesData }) => {
    const isBlack = useSharedValue(false);
    const [afficheStyle, setAfficheStyle] = useState('style1');

    const { setActions } = useToolBarStore();

    // Set toolbar actions 
    const actions: Action[] = [
        {
            label: 'Style',
            icon: () => <MaterialIcons name="style" size={24} color="white" />,
            onPress: () => changeStyle(),
        }

    ];


    const changeStyle = () => {
        setAfficheStyle(afficheStyle === 'style1' ? 'style2' : 'style1');
    };

    return (
        <TouchableOpacity onPress={() => setActions(actions)}>
            {afficheStyle === 'style1' ? (
                <View style={styles.global_box_column}>
                    <View style={styles.logo_box}>
                        <Image source={matchesData.homeIcon_alpha} style={styles.logo_match} />
                        <Image source={matchesData.awayIcon_alpha} style={styles.logo_match} />
                    </View>
                    <View style={styles.logo_box}>
                        <Text style={[styles.text_team]}>{matchesData?.home}</Text>
                        <Text style={[styles.text_team]}> </Text>
                        <Text style={[styles.text_team]}>{matchesData?.away}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.global_box_row}>
                    <View style={styles.logo_box_column}>
                        <Text style={[styles.text_team]}>{matchesData?.home}</Text>
                        <Text style={[styles.text_team]}>{matchesData?.away}</Text>
                    </View>
                    <View style={styles.logo_box_row}>
                        <Image source={matchesData.homeIcon_alpha} style={styles.logo_match_row} />
                        <Image source={matchesData.awayIcon_alpha} style={styles.logo_match_row} />
                    </View>
                </View>
            )

            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    global_box_column: {
        flexDirection: "column",
        width: '100%',
        //alignItems: 'center',
        //justifyContent: 'space-between',
        paddingLeft: 60,
        paddingRight: 60
    },
    global_box_row: {
        flexDirection: "row",
        width: '100%',
        //alignItems: 'center',
        justifyContent: 'space-between',
        //paddingLeft: 60,
        //paddingRight: 60
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
    logo_box_column: {
        flexDirection: "column",
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        gap: 10
    },
    logo_box_row: {
        flexDirection: "row",
        flex: 1,
        alignItems: 'flex-start',
    },
    text_team: {
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'LatoBlackItalic',
        color: "white"
    },
    logo_match: {
        width: 80,
        height: 80,
        margin: 25
    },
    logo_match_row: {
        width: 60,
        height: 60,
        margin: 15
    },
})

export default AfficheCard;