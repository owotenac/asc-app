import { PlateauCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalPlateauCardProps = {
    match : PlateauCardProps
}

const PlateauCardProgram: React.FC<LocalPlateauCardProps> = ( {match }) => {

    return (
        <View style={styles.match_card}>

                    <View style={styles.view_category}>
                        <Text style={styles.text_category}>{match.Competition}</Text>
                    </View>

            <View style={styles.view_date}>
                <Text style={styles.text_date}>{match.DisplayDate} - {match.Time}</Text>
            </View>
                    <View style={styles.line}></View>
            <View style={styles.view_match}>
                <Image source={match.Logo} style={styles.logo_match} />
                <Text style={styles.text_match}>{match.Location}</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    view_category: {
        //backgroundColor: '#fff',
    },
    text_category: {
        color: '#ffffffff',
        fontSize: 15,
        margin: 5
    },
    match_card: {
        flex: 1,
        padding: 3,
    },
    view_date: {
        //backgroundColor: '#fff'
    },
    text_date: {
        color: '#ffffffff',
        fontSize: 12,
        margin: 5
    },
    view_match: {
        //backgroundColor: '#ffffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //borderRadius: 10
    },
    text_match: {
        fontSize: 15,
                color: '#ffffffff',
    },
    logo_match: {
        width: 30,
        height: 30,
        margin: 5,
        borderRadius: 10
    },
    line: {
        height: 1,
        backgroundColor: 'white'
    }
});

export default PlateauCardProgram;