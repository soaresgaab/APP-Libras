import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';
import Drawer from 'expo-router/drawer';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  BackHandler,
  Dimensions,
} from 'react-native';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';
import Color from 'color';
import { Link, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import useToken from '@/hooks/getToken';
import imageLogo from '@/assets/images/logoNoBackground.png';
import ImageModal from '@/module/Image-modal';
import {
  SvgCamara,
  SvgExpressaoRegional,
  SvgVila,
} from './libras_componentes/image-icon-drawer';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export default function CustomDrawerContent(props: any) {
  const [dataF, setDataF] = useState<any>();
  const noAuth = ['(edition)', '(editionwords)', '(auth)', '(viewsugesstion)'];
  const [labelLogout, setLabel] = useState<string | null>('');

  const token = useToken(props);
  const path = usePathname();
  useEffect(() => {
    console.log(path);
    const filterRoutes = () => {
      if (token === null) {
        const filteredRoutes = props.state.routes.filter(
          (route: any) => !noAuth.includes(route.name),
        );
        const filterRoutesNames = props.state.routeNames.filter(
          (route: any) => !noAuth.includes(route),
        );
        const teste = Object.keys(props.descriptors)
          .filter((key) => !noAuth.some((noAuthKey) => key.includes(noAuthKey)))
          .reduce((obj: any, key: any) => {
            obj[key] = props.descriptors[key];
            return obj;
          }, {});
        const newState = {
          ...props,
          descriptors: teste,
          state: {
            ...props.state,
            index: props.state.index,
            routeNames: filterRoutesNames,
            routes: filteredRoutes,
          },
        };
        setLabel(null);
        setDataF(newState);
      } else {
        setLabel('Logout');
        setDataF(null);
      }
    };

    filterRoutes();
  }, [token, path]);

  const label = labelLogout || 'Login';

  const handlePressLogin = () => {
    if (labelLogout) {
      AsyncStorage.clear();
      router.navigate('/');
    } else {
      router.navigate('(auth)');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} style={{ marginTop: -15 }}>
        <View
          style={{
            paddingTop: 5,
            alignSelf: 'center',
          }}
        >
          <ImageModal
            disabled={true}
            style={{
              width: isTablet ? 160 : 120,
              height: isTablet ? 160 : 120,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            source={imageLogo}
          ></ImageModal>
          <Text
            style={{
              marginTop: 0,
              marginBottom: 10,
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 20,
              width: '75%',
              fontWeight: '900',
            }}
          >
            ParáLibras
          </Text>
        </View>
        <DrawerItem
          icon={() => <Ionicons name="home" size={20}></Ionicons>}
          label={'Página inicial'}
          onPress={() => router.push('/(tab)')}
          style={{
            backgroundColor: path == '/' ? '#a4e1cb' : '#F6F2DA',
            borderTopColor: '#5e6b66',
            borderTopWidth: 1,
          }}
          labelStyle={{
            marginLeft: -12,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => <Ionicons name="mail-unread" size={20}></Ionicons>}
          label={'Enviar Sugestão'}
          onPress={() => {
            console.log(path);
            router.push('/sendsuggestionn');
          }}
          style={{
            backgroundColor: path == '/sendsuggestionn' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -12,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="information"
              size={24}
              color="black"
            />
          )}
          label={'Sobre'}
          onPress={() => {
            router.push('/about');
          }}
          style={{
            backgroundColor: path == '/about' ? '#a4e1cb' : '#F6F2DA',
            borderBottomColor: '#5e6b66',
            borderBottomWidth: 1,
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => <SvgCamara />}
          label={'Camara Municipal de Marabá'}
          onPress={() => {
            router.push('/camara');
          }}
          style={{
            marginLeft: -0,
            backgroundColor: path == '/camara' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -25,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons name="map-marker" size={28} color="black" />
          )}
          label={'Bairros'}
          onPress={() => {
            router.push('/bairros');
          }}
          style={{
            marginLeft: 8,
            backgroundColor: path == '/bairros' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -16,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => <SvgVila />}
          label={'Vilas'}
          onPress={() => {
            router.push('/vilas');
          }}
          style={{
            marginLeft: 2,
            backgroundColor: path == '/vilas' ? '#a4e1cb' : '#F6F2DA',
            borderBottomColor: '#5e6b66',
            borderBottomWidth: 1,
          }}
          labelStyle={{
            marginLeft: -23,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="format-letter-case"
              size={24}
              color="black"
            />
          )}
          label={'Alfabeto'}
          onPress={() => {
            router.push('/alfabeto');
          }}
          style={{
            backgroundColor: path == '/alfabeto' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>

        <DrawerItem
          icon={() => <SvgExpressaoRegional />}
          label={'Expressões Regionais'}
          onPress={() => {
            router.push('/expressoesregionais');
          }}
          style={{
            marginLeft: -0,
            backgroundColor:
              path == '/expressoesregionais' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -25,
          }}
        ></DrawerItem>

        <DrawerItem
          icon={() => <Ionicons name="hand-left" size={20}></Ionicons>}
          label={'Saudações'}
          onPress={() => {
            router.push('/saudacoes');
          }}
          style={{
            backgroundColor: path == '/saudacoes' ? '#a4e1cb' : '#F6F2DA',
            borderBottomColor: '#5e6b66',
            borderBottomWidth: 1,
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>

        <DrawerItem
          icon={() => <Octicons name="number" size={20} color="black" />}
          label={'Números'}
          onPress={() => {
            router.push('/numeros');
          }}
          style={{
            marginLeft: 15,
            backgroundColor: path == '/numeros' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>

        <DrawerItem
          icon={() => <Octicons name="number" size={20} color="black" />}
          label={'Matemática'}
          onPress={() => {
            router.push('/matematica');
          }}
          style={{
            marginLeft: 15,
            backgroundColor: path == '/matematica' ? '#a4e1cb' : '#F6F2DA',
            borderBottomColor: '#5e6b66',
            borderBottomWidth: 1,
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>

        <DrawerItem
          icon={() => <Feather name="edit" size={20} color="black" />}
          label={'Personalizar'}
          onPress={() => {
            router.push('/personalize');
          }}
          style={{
            backgroundColor: path == '/personalize' ? '#a4e1cb' : '#F6F2DA',
          }}
          labelStyle={{
            marginLeft: -15,
          }}
        ></DrawerItem>
      </DrawerContentScrollView>

      <View style={{}}>
        <View style={styles.borda}></View>
        <DrawerItem
          label={label}
          onPress={() => handlePressLogin()}
          icon={() => {
            // Decida qual ícone renderizar com base no valor da variável
            if (labelLogout) {
              // Se myVariable for nula, retorne o ícone "arrow-undo"
              return (
                <Ionicons
                  style={{
                    alignSelf: 'center',
                    position: 'relative',
                    left: 80,
                  }}
                  name="arrow-undo"
                  size={20}
                />
              );
            } else {
              // Se myVariable não for nula, retorne o ícone "arrow-forward"
              return (
                <Ionicons
                  style={{
                    alignSelf: 'center',
                    position: 'relative',
                    left: 80,
                  }}
                  name="log-in-sharp"
                  size={25}
                />
              );
            }
          }}
          labelStyle={{
            alignSelf: 'center',
            fontSize: 16,
            color: 'black',
          }}
        ></DrawerItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  borda: {
    width: '80%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#cac9c99c',
  },
  text: {
    fontWeight: '700',
    color: '#1c1c1ead',
    marginLeft: 5,
  },
});
