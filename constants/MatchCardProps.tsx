import { ImageURISource } from 'react-native';


export type MatchCardProps = {
    Competition: string;
    DisplayDate: string;
    home: string;
    away: string;
    homeIcon: ImageURISource;
    awayIcon: ImageURISource;
    Time: string
    showDetails: boolean 
};
