import { MatchCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalMatchCardProps = {
    match : MatchCardProps
}

const MatchCardProgram: React.FC<LocalMatchCardProps> = ( {match }) => {

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
                <Image source={match.homeIcon_alpha} style={styles.logo_match} />
                <Text style={styles.text_match}>{match.home}</Text>
                {/* {match.homeScore ? ( */}
                    <>
                        <Text style={styles.text_score}>{match.homeScore}</Text>
                        <Text style={styles.text_score}>-</Text>
                        <Text style={styles.text_score}>{match.awayScore}</Text>
                    </>
                {/* ) : null} */}
                <Text style={styles.text_match}>{match.away}</Text>
                <Image source={match.awayIcon_alpha} style={styles.logo_match} />
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
        padding: 5,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        //borderRadius: 10
    },
    text_match: {
        fontSize: 15,
        color: '#ffffffff',
        margin:5
    },
    text_score: {
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'LatoItalic',
        color: "white"
    },
    logo_match: {
        width: 40,
        height: 40,
        margin: 5
    },
    line: {
        height: 1,
        backgroundColor: 'white'
    }
});

export default MatchCardProgram;