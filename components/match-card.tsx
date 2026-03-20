import { MatchCardProps } from '@/constants/MatchCardProps';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

type LocalMatchCardProps = {
    match: MatchCardProps;
    showDetails: boolean;
};

// Détermine si AS Canet a gagné, perdu ou match nul
function getResult(match: MatchCardProps): 'win' | 'loss' | 'draw' | 'upcoming' {
    const home = match.homeScore;
    const away = match.awayScore;
    if (home === null || home === undefined || away === null || away === undefined) return 'upcoming';
    //if (home === '' || away === '') return 'upcoming';

    const h = home;
    const a = away;
    if (isNaN(h) || isNaN(a)) return 'upcoming';

    const ascIsHome = match.home?.toUpperCase().includes('CANET');
    if (h === a) return 'draw';
    if (ascIsHome) return h > a ? 'win' : 'loss';
    return a > h ? 'win' : 'loss';
}

const BORDER_COLOR: Record<string, string> = {
    win:      '#4ade80',
    loss:     '#f87171',
    draw:     '#fbbf24',
    upcoming: '#4e6d50'
};

const MatchCard: React.FC<LocalMatchCardProps> = ({ match, showDetails }) => {
    const result = getResult(match);
    const isUpcoming = result === 'upcoming';

    const ascIsHome = match.home?.toUpperCase().includes('CANET');
    const homeIsWinner = result === 'win' && ascIsHome || result === 'loss' && !ascIsHome;
    const awayIsWinner = result === 'win' && !ascIsHome || result === 'loss' && ascIsHome;

    return (
        <View style={[styles.card, { borderLeftColor: BORDER_COLOR[result] }]}>

            {/* Catégorie + date — optionnels */}

            {showDetails && (

                <View style={styles.metaRow}>
                    <Text style={styles.competition} numberOfLines={1}>{match.Competition}</Text>
                    <Text style={styles.dateTime}>{match.DisplayDate} · {match.Time}</Text>
                </View>
            )}

            {!showDetails && (
                <Text style={styles.dateTime}>{match.DisplayDate} · {match.Time}</Text>
            )}

            {/* Match */}
            <View style={styles.matchRow}>

                {/* Logo domicile */}
                <View style={styles.logoWrap}>
                    {match.homeIcon
                        ? <Image source={match.homeIcon_alpha} style={styles.logo} contentFit="contain" />
                        : <Text style={styles.logoFallback}>{match.home?.slice(0, 3).toUpperCase()}</Text>
                    }
                </View>

                {/* Équipe domicile */}
                <Text
                    style={[styles.teamName, homeIsWinner && styles.winner, !homeIsWinner && !isUpcoming && styles.loser]}
                    numberOfLines={1}
                >
                    {match.home}
                </Text>

                {/* Score ou vs */}
                <Text style={[styles.score, { color: BORDER_COLOR[result] }]}>
                    {isUpcoming ? 'vs' : `${match.homeScore}–${match.awayScore}`}
                </Text>

                {/* Équipe extérieure */}
                <Text
                    style={[styles.teamName, styles.teamAway, awayIsWinner && styles.winner, !awayIsWinner && !isUpcoming && styles.loser]}
                    numberOfLines={1}
                >
                    {match.away}
                </Text>

                {/* Logo extérieur */}
                <View style={styles.logoWrap}>
                    {match.awayIcon
                        ? <Image source={match.awayIcon_alpha} style={styles.logo} contentFit="contain" />
                        : <Text style={styles.logoFallback}>{match.away?.slice(0, 3).toUpperCase()}</Text>
                    }
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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

    // Meta (catégorie + date)
    metaRow: {
        //flexDirection: 'row',
        //alignItems: 'flex-start',
        gap: 5
    },
    competition: {
        color: 'rgb(255, 255, 255)',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: "center"
    },
    dateTime: {
        color: 'rgba(224, 224, 224, 0.87)',
        fontSize: 13,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    // Match row
    matchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoWrap: {
        width: 28,
        height: 28,
        backgroundColor: '#1a2e1c',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    logoFallback: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 9,
        fontFamily: 'LatoRegular',
        letterSpacing: 0.5,
    },
    teamName: {
        flex: 1,
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'LatoRegular',
    },
    teamAway: {
        textAlign: 'right',
        color: 'rgb(255, 255, 255)',
    },
    winner: {
        color: '#4ade80',
    },
    loser: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    score: {
        fontFamily: 'LatoRegular',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
        textAlign: 'center',
        minWidth: 44,
        flexShrink: 0,
    },
});

export default MatchCard;