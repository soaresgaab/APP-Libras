import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Dimensions, StatusBar } from 'react-native';
import CustomDrawerContent from '@/components/customDrawer';
import { RenderHeader } from '@/components/libras_componentes/image-header';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';
import { RenderLeftHeader } from '@/components/libras_componentes/icon-left-header';
import Color from 'color';
import SVGNameApp from '@/components/libras_componentes/name-app';
import ImageModal from '@/module/Image-modal';
import imageLogo from '@/assets/images/logoNoBackground.png';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const isWeb = width >= 1000 && height >= 617;

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'camara',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerRight(props) {
              return (
                <ImageModal
                  disabled={true}
                  style={{
                    width: isTablet ? 160 : 60,
                    height: isTablet ? 160 : 60,
                    alignSelf: 'baseline',
                    borderRadius: 10,
                    flexWrap: 'wrap',
                    display: 'flex',
                  }}
                  source={imageLogo}
                ></ImageModal>
              );
            },
            headerTitle(props) {
              return <SVGNameApp />;
            },
            headerLeft(props) {
              return <RenderLeftHeader color={props.tintColor} />;
            },
            swipeEdgeWidth: Dimensions.get('screen').width * 0.5,
            headerStyle: {
              borderBottomStartRadius: 0,
              borderBottomEndRadius: 0,
              backgroundColor: '#ffffff00',
            },
            headerTransparent: true,
            unmountOnBlur: true,
            headerTitleAlign: 'center',
            // headerTintColor: 'black',
            headerShadowVisible: false,
            headerStatusBarHeight: isWeb ? 0 : isTablet ? 100 : 26,
            // headerLeftLabelVisible: false,
            headerTintColor: 'black',
            // headerPressColor: 'red',
            headerLeftContainerStyle: {
              // backgroundColor: 'red',
              paddingLeft: '0%',
              marginLeft: 0,
              // alignItems: 'center',
              // backgroundColor: 'blue',
            },
            headerRightContainerStyle: {
              paddingRight: '0%',
              alignContent: 'flex-end',
              display: 'flex',
              flexWrap: 'wrap',
              marginRight: 7,
              // backgroundColor: 'blue',
            },
            headerTitleStyle: {
              // backgroundColor: 'red',
              paddingHorizontal: 0,
              fontSize: 18,
            },
            headerTitleContainerStyle: {
              paddingHorizontal: '0%',
              // backgroundColor: 'blue',
            },
            headerBackgroundContainerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderBottomStartRadius: 0,
              borderBottomEndRadius: 0,
              // marginHorizontal: '10%',
            },
            sceneContainerStyle: {
              // backgroundColor: 'red',
            },
            // drawerContentStyle: {
            //   backgroundColor: 'red',
            // },
            drawerActiveBackgroundColor: '#e7503b',
            drawerStyle: {
              backgroundColor: '#edf8f4',
              width: 320,
            },
            // drawerLabelStyle: {
            //   fontSize: 25,
            // },
            drawerActiveTintColor: 'black',
            // freezeOnBlur: false,
            // overlayColor: 'red',
            // headerShown: false,
          }}
          drawerContent={CustomDrawerContent}
        ></Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
