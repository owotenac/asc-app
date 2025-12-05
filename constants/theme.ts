/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Dimensions, Platform, StyleSheet } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const asc_background = '#024906ff';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});


export const TabBarTheme = {
  headerStyle: {
    backgroundColor: '#ffffffff',
  },
  headerShadowVisible: false,
  headerTintColor: '#000000ff',
  tabBarStyle: {
    backgroundColor: '#ffffffff',
  },
  headerShown: true,
  
}

export const global_styles = StyleSheet.create({
    text_vertical: {
        color: '#ffffff40',
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
    },
    left_box: {
        position: 'absolute',
        top: 250,
        left:(-screenHeight / 2) + 55,
        width: screenHeight,
        height: 100,
        transform: [{ rotate: '-90deg' }],
    }    
  })