
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import { useAppStore } from '@/constants/filter';

import AfficheBase from '@/components/affiche-base';
import ScoreCard from '@/components/score-card';
import React from 'react';


export default function Resultat() {

  const { matchProps } = useAppStore();

  return (
    <AfficheBase isResultat={true}>

      <React.Fragment >
        <MovableText text={matchProps.Competition} />
        <MovableView initialPosition={80}>
          <ScoreCard matchesData={matchProps} ></ScoreCard>
        </MovableView>
      </React.Fragment>

    </AfficheBase>
  );
}
