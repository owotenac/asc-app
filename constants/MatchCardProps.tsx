import { ImageURISource } from 'react-native';


export type MatchCardProps = {
    Competition: string;
    DisplayDate: string;
    home: string;
    away: string;
    homeIcon: ImageURISource;
    awayIcon: ImageURISource;
    homeIcon_alpha: string;
    awayIcon_alpha: string;
    Time: string
    showDetails: boolean 
    homeScore: string
    awayScore: string
};
