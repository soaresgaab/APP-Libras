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
import { Dimensions } from 'react-native';
import CustomDrawerContent from '@/components/customDrawer';
import { RenderHeader } from '@/components/libras_componentes/image-header';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';
import { RenderLeftHeader } from '@/components/libras_componentes/icon-left-header';
import Color from 'color';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

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
            headerTitle(props) {
              return <RenderHeader />;
            },
            headerLeft(props) {
              return <RenderLeftHeader color={props.tintColor} />;
            },
            swipeEdgeWidth: Dimensions.get('screen').width * 0.5,
            headerStyle: {
              borderBottomStartRadius: 15,
              borderBottomEndRadius: 15,
            },
            headerTransparent: true,
            unmountOnBlur: true,
            headerTitleAlign: 'center',
            // headerTintColor: 'black',
            headerShadowVisible: false,
            headerStatusBarHeight: isTablet ? 100 : 55,
            // headerLeftLabelVisible: false,
            headerTintColor: '#e7503b',
            // headerPressColor: 'red',
            headerLeftContainerStyle: {
              // backgroundColor: 'red',
              paddingLeft: '0%',
              marginLeft: 7,
              // alignItems: 'center',
              // backgroundColor: 'blue',
            },
            headerRightContainerStyle: {
              paddingRight: '0%',
              alignItems: 'center',
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
              borderBottomStartRadius: 28,
              borderBottomEndRadius: 28,
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
              backgroundColor: '#F6F2DA',
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
