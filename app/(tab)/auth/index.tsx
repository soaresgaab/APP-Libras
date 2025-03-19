import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import { GetToken } from '@/utils/axios/auth/GetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Separator from '@/components/libras_componentes/separator';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 && height >= 1024;

const App = () => {
  const [DataUser, setDataUser] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  async function submitData() {
    setLoading(true);
    setError('');

    try {
      const response = await GetToken(DataUser);

      if (response.status === 201) {
        await AsyncStorage.multiSet([
          ['token', response.data.token],
          ['user', response.data.user],
        ]);

        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
          router.navigate('/');
        }, 3000);
      } else {
        setError('Usuário ou senha incorretos.');
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(text: string, field: string) {
    setDataUser((prev) => ({ ...prev, [field]: text }));
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: '#edf8f4' }}>
        <Text style={styles.title}>Acesso de usuários administradores</Text>
        <Separator marginTopProp={15} marginBottomProp={15} />

        <Text style={styles.label}>Usuário:</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Insira o nome de usuário"
            value={DataUser.userName}
            onChangeText={(text) => handleInput(text, 'userName')}
          />
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Senha:</Text>
        <View>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Insira a senha"
            value={DataUser.password}
            onChangeText={(text) => handleInput(text, 'password')}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.buttonLogin,
            { backgroundColor: pressed ? '#ffffff' : '#86c7aa' },
          ]}
          onPress={submitData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#03459e" />
          ) : (
            <Text style={{ fontSize: 18 }}>Entrar</Text>
          )}
        </Pressable>
      </ScrollView>
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            Login bem-sucedido!
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: isTablet ? 120 : 90,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#03459e',
    width: '90%',
  },
  label: {
    alignSelf: 'center',
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    alignSelf: 'center',
    paddingLeft: 15,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3d9577',
    width: '90%',
    fontSize: 16,
  },
  error: {
    color: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 17,
  },
  buttonLogin: {
    marginTop: 30,
    alignSelf: 'center',
    width: 190,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3d9577',
  },
  toast: {
    position: 'absolute',
    top: 105,
    textAlign: 'center',
    justifyContent: 'center',
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#3d9577',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10,
  },
});

export default gestureHandlerRootHOC(App);
