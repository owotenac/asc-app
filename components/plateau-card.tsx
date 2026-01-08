import { PlateauCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalPlateauCardProps = {
    match : PlateauCardProps
}

const PlateauCard: React.FC<LocalPlateauCardProps> = ( {match }) => {

    return (
        <View style={styles.match_card}>
                    <View style={styles.view_category}>
                        <Text style={styles.text_category}>{match.Competition}</Text>
                    </View>
                    <View style={styles.line}></View>
               
            <View style={styles.view_date}>
                <Text style={styles.text_date}>{match.DisplayDate} - {match.Time}</Text>
            </View>
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
        fontSize: 20,
        margin: 5
    },
    match_card: {
        flex: 1,
        //backgroundColor: '#14611438',
        justifyContent: 'center',
        padding: 10,
        gap: 1,
    },
    view_date: {
        //backgroundColor: '#fff'
    },
    text_date: {
        color: '#ffffffff',
        fontSize: 16,
        margin: 5
    },
    view_match: {
        backgroundColor: '#ffffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text_match: {
        fontSize: 15
    },
    text_score: {
        fontSize: 20,
        fontWeight: 600,
        fontFamily: 'LatoItalic'
    },
    logo_match: {
        width: 60,
        height: 60,
        margin: 5
    },
    line: {
        height: 1,
        backgroundColor: 'white'
    }
});

export default PlateauCard;