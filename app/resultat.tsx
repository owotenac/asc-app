
import MovableText from '@/components/movable-text';
import MovableView from '@/components/movable-view';
import TeamImage from '@/components/team-image';
import Toolbar from '@/components/toolbar';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';
import { global_styles } from '@/constants/theme';

import ScoreCard from '@/components/score-card';
import { GetMatch } from '@/hooks/firebase';
import domtoimage from 'dom-to-image';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewShot, { captureRef } from 'react-native-view-shot';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const captureWidth = screenWidth;
const captureHeight = (screenWidth / 4) * 5; // 4:5 ratio

export default function Resultat() {

  const viewShotRef = useRef<ViewShot>(null);


  // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
  //   "granularPermissions": [
  //     "photo",
  //     "audio"
  //   ]
  // });
  const { image } = useLocalSearchParams<{ image: string }>();
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<MatchCardProps[]>([])
  const { date } = useAppStore();
  const { categoryProps } = useAppStore();

  const teamImg = { uri: image };


  async function getPermission() {
    //to get access to Media
    // if (!permissionResponse?.granted) {
    //   console.log("No permission to write")
    //   await requestPermission();
    // }
  }


  useEffect(() => {
    //retreive matchs
    const fetchMatches = async () => {
      try {
        const result = await GetMatch(date, String(categoryProps.cp_no));
        setMatch(result);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);


  const share = () => {
    console.log("Share")
  }

  const screenShot = async () => {
    if (Platform.OS !== 'web') {
      try {
        getPermission();

        if (viewShotRef && viewShotRef.current) {
          // Capture the view as a URI
          const uri = await captureRef(viewShotRef, {

            quality: 1,
          });
          await MediaLibrary.saveToLibraryAsync(uri);
          // You can now share or save the image
          Alert.alert('Success', `Screenshot captured and saved to gallery!`);
          // Optional: Share the image
          // await Sharing.shareAsync(uri);
        }
      } catch (error) {
        console.error('Error capturing view:', error);
      }
    }
    else {

      if (viewShotRef && viewShotRef.current) {

        try {
          const dataUrl = await domtoimage.toJpeg(viewShotRef.current, {
            quality: 0.95,

          });

          let link = document.createElement('a');
          link.download = 'sticker-smash.jpeg';
          link.href = dataUrl;
          link.click();
        }

        catch (e) {
          console.log(e);
        }
      }
    }
  };


  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container} >
        <GestureHandlerRootView  >

          <ViewShot ref={viewShotRef}
            style={{
              width: captureWidth,
              height: captureHeight,
              overflow: 'hidden', // Clips content that exceeds bounds
            }}
            options={{
              format: 'png',
              quality: 1,
            }}
          >
            {/* <View ref={viewShotRef}> */}
            <TeamImage
              imgSource={teamImg}
              imageSize={screenWidth}
              onScreenshot={screenShot}
            />
            <View style={global_styles.left_box}>
              <Text style={global_styles.text_vertical}>RESULTAT DU WEEKEND</Text>
            </View>
            {
              loading ? (
                <ActivityIndicator size="large" />
              ) : (
                match.map((m, index) => (
                  <React.Fragment key={index}>
                    <MovableText text={m.Competition} />
                    <MovableView initialPosition={80}>
                    <ScoreCard matchesData={m} ></ScoreCard>
                    </MovableView>
                  </React.Fragment>
                ))
              )
            }
          </ViewShot>
          <View style={global_styles.captureArea}></View>
          {/* </View> */}
          <Toolbar></Toolbar>
        </GestureHandlerRootView >
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});