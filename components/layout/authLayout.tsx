import { Dimensions } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { RenderHeader } from '../libras_componentes/image-header';
import CustomDrawerContent from '../customDrawer';
import { Ionicons } from '@expo/vector-icons';

export function LayoutRoot() {
  return (
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
        // unmountOnBlur: true,
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
        // sceneContainerStyle: {
        //   backgroundColor: 'red',
        // },
        // drawerContentStyle: {
        //   backgroundColor: 'red',
        // },
        drawerActiveBackgroundColor: '#e7503b',
        drawerStyle: {
          backgroundColor: '#edf8f4',
        },
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
        name="(search)"
        options={{
          title: 'Atendimentos por Tipo',
          drawerLabel: 'Atendimentos por Tipo',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="compass" size={20}></Ionicons>,
          drawerLabelStyle: { marginLeft: -15 },

          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="(edition)"
        options={{
          title: 'editar categoria',
          drawerLabel: 'editar categoria',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="compass" size={20}></Ionicons>,
          drawerLabelStyle: { marginLeft: -15 },
        }}
      />
      <Drawer.Screen
        name="(editionwords)"
        options={{
          title: 'editar words',
          drawerLabel: 'editar palavras',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="add-circle" size={20}></Ionicons>,
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
          drawerIcon: () => <Ionicons name="mail-unread" size={20}></Ionicons>,
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
            <Ionicons name="aperture-outline" size={20}></Ionicons>
          ),
          drawerLabelStyle: { marginLeft: -15 },
        }}
      />
      <Drawer.Screen
        name="(saudacoes)"
        options={{
          title: 'Saudações',
          drawerLabel: 'Saudações',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="hand-left" size={20}></Ionicons>,
          drawerLabelStyle: { marginLeft: -15 },
        }}
      />
      <Drawer.Screen
        name="(sinais)"
        options={{
          title: 'sinais',
          drawerLabel: 'sinais',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="apps" size={20}></Ionicons>,
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
          drawerIcon: () => <Ionicons name="mail-unread" size={20}></Ionicons>,
          drawerLabelStyle: { marginLeft: -15 },
        }}
      />
      <Drawer.Screen
        name="(auth)"
        options={{
          title: 'Login',
          drawerLabel: 'Login',
          drawerPosition: 'left',
          drawerType: 'front',
          drawerIcon: () => <Ionicons name="lock-closed" size={20}></Ionicons>,
          drawerLabelStyle: { marginLeft: -15 },
        }}
      />
    </Drawer>
  );
}
