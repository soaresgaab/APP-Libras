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
              fontSize: 15,
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
            // freezeOnBlur: false,
            // overlayColor: 'red',
            // headerShown: false,
          }}
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Atendimentos por Sexo',
              title: 'Atendimentos por Sexo',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="home" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="atendimentoBairro"
            options={{
              title: 'Atendimento por Bairros',
              drawerLabel: 'Atendimento por Bairros',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="atendimentoFaixaEtaria"
            options={{
              title: 'Atendimentos por Faixa Etária',
              drawerLabel: 'Atendimentos por Faixa Etária',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="cellular" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="atendimentoTipoOcorrencia"
            options={{
              title: 'Atendimentos por Tipo',
              drawerLabel: 'Atendimentos por Tipo',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="compass" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="atendimentoVeiculo"
            options={{
              title: 'Atendimentos por Veículo',
              drawerLabel: 'atendimento por Veículo',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="bag-add" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="cancelamentoChamada"
            options={{
              title: 'Motivos de Cancelamento',
              drawerLabel: 'Motivos de Cancelamento',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="(tabsAtendimentosMotivos)"
            options={{
              title: 'Atendimentos por motivo',
              drawerLabel: 'Atendimentos por motivo',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="shapes" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="tempoDeResposta"
            options={{
              title: 'Tempo de Resposta',
              drawerLabel: 'tempo de Resposta',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="tempoNoLocal"
            options={{
              title: 'Tempo no local',
              drawerLabel: 'Tempo no Local',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="tempoSaidaLocal"
            options={{
              title: 'Tempo Saida do local',
              drawerLabel: 'Tempo Saida do local',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="destinoPaciente"
            options={{
              title: 'Destino Pacientes',
              drawerLabel: 'Destino Pacientes',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="chamadasDiaNoite"
            options={{
              title: 'Chamadas por Dia/Noite',
              drawerLabel: 'chamadas por Dia/Noite',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => <Ionicons name="pulse" size={20}></Ionicons>,
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="transferencias"
            options={{
              title: 'Transferencias',
              drawerLabel: 'Transferencias',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
          <Drawer.Screen
            name="obitos"
            options={{
              title: 'obitos',
              drawerLabel: 'Obitos',
              drawerPosition: 'left',
              drawerType: 'slide',
              drawerIcon: () => (
                <Ionicons name="pie-chart" size={20}></Ionicons>
              ),
              drawerLabelStyle: { marginLeft: -15 },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
