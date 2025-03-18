import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';
import * as Crypto from 'expo-crypto';
import { View, TextInput, Pressable } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { GetToken } from '@/utils/axios/auth/GetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Separator from '@/components/libras_componentes/separator';
import Toast, { ToastRef } from 'react-native-toast-notifications';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 && height >= 1024;

const App = () => {
  const [DataUser, setDataUser] = useState({
    userName: '',
    password: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const toastRef = React.useRef<ToastRef>(null); 

  useEffect(() => {}, []);

  async function submitData() {
    const response = await GetToken(DataUser);

    if (response.status === 201) {
      await AsyncStorage.multiSet([
        ['token', response.data.token],
        ['user', response.data.user],
      ]);

      toastRef.current?.show('Login realizado com sucesso!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
      });

      router.navigate('/');
    } else {
      setError('Usuário ou senha incorretos.');
      setTimeout(() => setError(''), 3000);
    }
  }

  async function handleInput(text: string, field: string) {
    setDataUser((prev) => {
      return { ...prev, [field]: text };
    });
  }

  return (
    <ScrollView style={{ backgroundColor: '#edf8f4' }}>
      <Text
        style={{
          marginTop: isTablet ? 120 : 90,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 26,
          letterSpacing: 0,
          width: '90%',
          fontWeight: 'bold',
          color: '#03459e',
        }}
      >
        Acesso de usuários administradores
      </Text>
      <Separator marginTopProp={15} marginBottomProp={15}></Separator>
      <Text
        style={{
          alignSelf: 'center',
          width: '80%',
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        Usuário:
      </Text>
      <View>
        <TextInput
          style={{
            alignSelf: 'center',
            paddingLeft: 15,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#3d9577',
            width: '90%',
            fontSize: 16,
          }}
          placeholder="Insira o nome de usuário"
          value={DataUser.userName}
          onChangeText={(text) => handleInput(text, 'userName')}
        ></TextInput>
      </View>
      <View>
        <Text
          style={{
            alignSelf: 'center',
            width: '80%',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 15,
          }}
        >
          Senha:
        </Text>
        <TextInput
          style={{
            alignSelf: 'center',
            paddingLeft: 15,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#3d9577',
            width: '90%',
            fontSize: 16,
          }}
          secureTextEntry={true}
          placeholder="Insira a senha"
          value={DataUser.password}
          onChangeText={(text) => {
            handleInput(text, 'password');
          }}
        ></TextInput>
      </View>
      {error ? (
        <Text
          style={{
            color: 'red',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 15,
            fontSize: 17,
          }}
        >
          {error}
        </Text>
      ) : null}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ffffff' : '#86c7aa',
          },
          styles.buttonLogin,
        ]}
        onPress={() => {
          submitData();
        }}
      >
        <Text style={{ fontSize: 18 }}>Entrar</Text>
      </Pressable>
      <Toast ref={toastRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconClip: {
    marginTop: 5,
    // marginBottom: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLogin: {
    marginTop: 30,
    alignSelf: 'center',
    width: 190,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3d9577',
  },
});

export default gestureHandlerRootHOC(App);
