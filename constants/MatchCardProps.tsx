import { ImageURISource } from 'react-native';

export type AgendaProps = {
    plateau : PlateauCardProps[];
    match : MatchCardProps[]
}

export type PlateauCardProps = {
    Competition: string;
    DisplayDate: string;
    Logo: ImageURISource;
    Time: string
    Location: string
};

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
    homeScore?: number
    awayScore?: number
};
