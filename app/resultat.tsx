
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import { useAppStore } from '@/constants/filter';

import AfficheBase from '@/components/affiche-base';
import ScoreCard from '@/components/score-card';
import { DistrictAPI } from '@/hooks/services';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function Resultat() {

  const { matchProps } = useAppStore();

  useEffect(() => {
    //#we test if awayScore and homeScore are defined
    if (matchProps.awayScore == null || matchProps.homeScore == null) {
      // we fetch the data from the API
      DistrictAPI.fetchMatchData(matchProps)
    }
  }, []);

  return (
    <AfficheBase verticalText={"RESULTAT DU WEEKEND"} showVertialText={true}>

      <View style={styles.child}>
        <MovableText text={matchProps.Competition} />
        <MovableView initialPosition={80}>
          <ScoreCard matchesData={matchProps} ></ScoreCard>
        </MovableView>
      </View>

    </AfficheBase>
  );
}


const styles = StyleSheet.create({
  child: {
    flex: 1,
    width: screenWidth,
    position: 'absolute',
    top: 1
  }
});