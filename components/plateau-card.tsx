import { PlateauCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalPlateauCardProps = {
    match : PlateauCardProps
}

const PlateauCard: React.FC<LocalPlateauCardProps> = ( {match }) => {

    return (
        <View style={styles.match_card}>
                    <Text style={styles.competition} numberOfLines={1}>{match.Competition}</Text>
                    <Text style={styles.dateTime}>{match.DisplayDate} · {match.Time}</Text>

              
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
        backgroundColor: '#111a13',
        borderWidth: 0.5,
        borderColor: '#4e6d508e',
        borderLeftWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginHorizontal: 16,
        marginBottom: 12,
        gap: 7,
    },
    competition: {
        color: 'rgb(255, 255, 255)',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: "left"
    },
    dateTime: {
        color: 'rgba(224, 224, 224, 0.77)',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    view_match: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text_match: {
         flex: 1,
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'LatoRegular',
    },
    text_score: {
        fontSize: 20,
        fontWeight: 600,
        fontFamily: 'LatoItalic'
    },
    logo_match: {
        width: 30,
        height: 30,
        margin: 5
    },
    line: {
        height: 1,
        backgroundColor: 'white'
    }
});

export default PlateauCard;