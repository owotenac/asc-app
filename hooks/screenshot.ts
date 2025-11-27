import domtoimage from 'dom-to-image';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';

  async function getPermission() {
    //to get access to Media
    // if (!permissionResponse?.granted) {
    //   console.log("No permission to write")
    //   await requestPermission();
    // }
  }


export const screenShot = async (viewShotRef: React.RefObject<ViewShot | null>) => {

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