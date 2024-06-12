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

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
            headerStatusBarHeight: 40,
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
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Página inicial',
              title: 'Página inicial',
              drawerType: 'front',
              drawerIcon: () => <Ionicons name="home" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />

          <Drawer.Screen
            name="(sendsuggestionn)"
            options={{
              title: 'Enviar Sugestão',
              drawerLabel: 'Enviar Sugestão',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => (
                <Ionicons name="mail-unread" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(alfabeto)"
            options={{
              title: 'Alfabeto',
              drawerLabel: 'Alfabeto',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="format-letter-case"
                  size={24}
                  color="black"
                />
              ),
              drawerLabelStyle: { marginLeft: -18 },
            }}
          />
          <Drawer.Screen
            name="(saudacoes)"
            options={{
              title: 'Saudações',
              drawerLabel: 'Saudações',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => (
                <Ionicons name="hand-left" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(sinais)"
            options={{
              title: 'Sinais',
              drawerLabel: 'Sinais',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => (
                <Ionicons name="hand-left" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(numeros)"
            options={{
              title: 'Números',
              drawerLabel: 'Números',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => (
                <Octicons name="number" size={20} color="black" />
              ),
              drawerLabelStyle: { marginLeft: -9 },
            }}
          />
          <Drawer.Screen
            name="(auth)"
            options={{ drawerItemStyle: { display: 'none' } }}
          />

          <Drawer.Screen
            name="(search)"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="(edition)"
            options={{
              title: 'Editar categoria',
              drawerLabel: 'Editar categoria',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => <Feather name="edit" size={20} color="black" />,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(editionwords)"
            options={{
              title: 'Editar words',
              drawerLabel: 'Editar palavras',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => <Feather name="edit" size={20} color="black" />,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(viewsugesstion)"
            options={{
              title: 'Vizualizar sugestões',
              drawerLabel: 'Vizualizar sugestões',
              drawerPosition: 'left',
              drawerType: 'front',
              drawerIcon: () => <Entypo name="list" size={25} color="black" />,
              drawerLabelStyle: { marginLeft: -19 },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
