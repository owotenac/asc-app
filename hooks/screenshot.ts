import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';

export const screenShot = async (viewShotRef: React.RefObject<ViewShot | null>) => {

    if (Platform.OS !== 'web') {
      try {
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
  };