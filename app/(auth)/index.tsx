import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';
import * as Crypto from 'expo-crypto';

import { View } from 'react-native';
import { TextInput } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { GetToken } from '@/utils/axios/auth/GetToken';

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [DataUser, setDataUser] = useState({
    userName: '',
    password: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {});

  async function submitData() {
    const response = await GetToken(DataUser);

    if (response.status === 201) {
      await AsyncStorage.multiSet([
        ['token', response.data.token],
        ['user', response.data.user],
      ]);
      router.navigate('/');
    }
    setError('Usuário ou senha incorretos.');
    setTimeout(() => setError(''), 3000); // Limpar erro após 3 segundos
  }

  async function handleInput(text: string, field: string) {
    setDataUser((prev) => {
      return { ...prev, [field]: text };
    });
  }

  return (
    <ScrollView style={{ backgroundColor: '#F6F2DA' }}>
      <SearchInput></SearchInput>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          fontWeight: 'bold',
        }}
      >
        Acesso de usuários administradores
      </Text>
      <Foundation
        style={styles.iconClip}
        name="paperclip"
        size={35}
        color="black"
      />
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
            borderColor: '#e7503b',
            width: '90%',
            fontSize: 16,
          }}
          placeholder="Ex: Usuario312"
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
            borderColor: '#e7503b',
            width: '90%',
            fontSize: 16,
          }}
          secureTextEntry={true}
          placeholder="Ex: Senha132"
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
            fontSize: 22,
          }}
        >
          {error}
        </Text>
      ) : null}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fa8f80' : '#e7503b',
          },
          styles.buttonLogin,
        ]}
        onPress={() => {
          submitData();
        }}
      >
        <Text style={{ fontSize: 18 }}>Entrar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconClip: {
    marginTop: 5,
    marginBottom: 15,
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
    borderColor: '#ff1e00',
  },
});

export default gestureHandlerRootHOC(App);
