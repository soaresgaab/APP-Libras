import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Color from 'color';
import { Link, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import useToken from '@/hooks/getToken';

export default function CustomDrawerContent(props: any) {
  const { colors } = useTheme();
  const erick = Color(colors.text).alpha(0.68).rgb().string();
  const { top, bottom } = useSafeAreaInsets();
  const [dataF, setDataF] = useState<any>();
  const noAuth = ['(edition)', '(editionwords)', '(auth)'];
  const [labelLogout, setLabel] = useState<string | null>('');

  const token = useToken(props);

  console.log(props.state.index + 'oi');

  useEffect(() => {
    const filterRoutes = () => {
      // console.log('entrou 2');
      // console.log(props);
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
        // console.log(props.state.index);
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
        // console.log(newState);
        setLabel(null);
        setDataF(newState);
      } else {
        setLabel('Logout');
        setDataF(null);
      }
    };

    filterRoutes();
  }, [token]);

  const data2 = dataF || props;
  console.log('data2:' + data2.state.index);
  const data3 = {
    ...data2,
    state: {
      ...data2.state,
      index: props.state.index,
    },
  };
  console.log('data3:' + data3.state.index);
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
      <DrawerContentScrollView {...data3} style={{ marginTop: -15 }}>
        <View
          style={{
            paddingTop: 15,
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              marginTop: 10,
              marginBottom: 15,
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 20,
              width: '75%',
              fontWeight: 'bold',
            }}
          >
            App Libras
          </Text>
        </View>
        <DrawerItemList {...data3} />
        {/* <DrawerItem label={'teste'} onPress={() => router.push('/')} />
        <DrawerItem label={'abelha'} onPress={() => AsyncStorage.clear()} /> */}
      </DrawerContentScrollView>

      <View style={{}}>
        <View style={styles.borda}></View>
        <DrawerItem
          label={label}
          onPress={() => handlePressLogin()}
          icon={() => {
            // Decida qual ícone renderizar com base no valor da variável
            if (labelLogout) {
              // Se myVariable não for nula, retorne o ícone "arrow-forward"
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
              // Se myVariable for nula, retorne o ícone "arrow-undo"
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
