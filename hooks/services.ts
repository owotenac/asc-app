import { useAppStore } from '@/constants/filter';
import axios from 'axios';
import { MatchCardProps } from './../constants/MatchCardProps';

export class DistrictAPI {

    static api = axios.create({
        baseURL: 'https://api-dofa.fff.fr/',
        timeout: 1000,
    });


    static fetchMatchData = async (match: MatchCardProps) => {
        const response = await DistrictAPI.api.get(`/api/match_entities/${match.MatchNumber}`);
        //we update the store with the new data
        useAppStore.setState({
            matchProps: {
              ...match,
              homeScore: response.data['home_score'],
              awayScore: response.data['away_score']
            }
          });
    }
}