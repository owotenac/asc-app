
import MovableText from '@/components/movable-text';
import TeamImage from '@/components/team-image';
import { useAppStore } from '@/constants/filter';
import { MatchCardProps } from '@/constants/MatchCardProps';

import Toolbar from '@/components/toolbar';

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
  const { category } = useAppStore();

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
        const result = await GetMatch(date, category);
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
            <View style={styles.left_box}>
              <Text style={styles.text_vertical}>RESULTAT DU WEEKEND</Text>
            </View>
            {
              loading ? (
                <ActivityIndicator size="large" />
              ) : (
                match.map((m, index) => (
                  <React.Fragment key={index}>
                    <MovableText text={m.Competition} />
                    <ScoreCard matchesData={m}></ScoreCard>
                  </React.Fragment>
                ))
              )
            }
          </ViewShot>
          <View style={styles.captureArea}></View>
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
    alignContent: 'space-evenly'
  },
  left_box: {
    position: 'absolute',
    top: 250,
    left: (-screenHeight / 2) + 30,
    width: screenHeight,
    height: 100,
  },
  text_vertical: {
    transform: [{ rotate: '-90deg' }],
    color: 'white',
    fontSize: 35,
    textAlign: "center",
    transformOrigin: 'center',
    fontFamily: 'LatoItalic'
  },
  captureArea: {
    position: 'absolute',
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 1,
    top: screenWidth / 0.8,
    height: 1,
    width: '100%'
  }

});