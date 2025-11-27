
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import { useAppStore } from '@/constants/filter';


import AfficheBase from '@/components/affiche-base';
import AfficheCard from '@/components/affiche-card';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function Affiche() {
    const { matchProps } = useAppStore();


    return (
        <AfficheBase isResultat={false}>
            <React.Fragment >
                <MovableText text={matchProps.Competition} />
                <MovableView initialPosition={80}>
                    <AfficheCard matchesData={matchProps} ></AfficheCard>
                </MovableView>
                <MovableView initialPosition={(screenWidth / 0.8) - 50}>
                    <View style={styles.date}>
                        <Text style={styles.text_date}>{matchProps.DisplayDate}</Text>
                        <Text style={styles.text_date}>{matchProps.Time}</Text>
                    </View>
                </MovableView>
            </React.Fragment>
        </AfficheBase>
    );
}

const styles = StyleSheet.create({
    date: {
        flexDirection: 'column',
    },
    text_date: {
        fontFamily: 'LatoItalic',
        fontSize: 20,
        color: 'white',
        textAlign: 'right'
    }
});