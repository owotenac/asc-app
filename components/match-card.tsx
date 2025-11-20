import { MatchCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalMatchCardProps = {
    match : MatchCardProps
    showDetails: boolean
}

const MatchCard: React.FC<LocalMatchCardProps> = ( {match, showDetails }) => {

    return (
        <View style={styles.match_card}>
            {showDetails ? (
                <>
                    <View style={styles.view_category}>
                        <Text style={styles.text_category}>{match.Competition}</Text>
                    </View>
                    <View style={styles.line}></View>
                </>
            ) : null}
            <View style={styles.view_date}>
                <Text style={styles.text_date}>{match.DisplayDate} - {match.Time}</Text>
            </View>
            <View style={styles.view_match}>
                <Image source={match.homeIcon} style={styles.logo_match} />
                <Text style={styles.text_match}>{match.home}</Text>
                {match.homeScore ? (
                    <>
                        <Text style={styles.text_score}>{match.homeScore}</Text>
                        <Text style={styles.text_score}>-</Text>
                        <Text style={styles.text_score}>{match.awayScore}</Text>
                    </>
                ) : null}
                <Text style={styles.text_match}>{match.away}</Text>
                <Image source={match.awayIcon} style={styles.logo_match} />
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
        justifyContent: 'space-between',
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

export default MatchCard;