import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import { View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function SearchInput({ fetchData, setRefreshing }: any) {
  const [search2, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [error, setError] = useState('');

  const handlePress = () => {
    if (!search2.trim()) {
      setError('O campo de pesquisa não pode estar vazio.');
      setTimeout(() => setError(''), 3000); // Limpar erro após 3 segundos
      return;
    }
    router.push({
      pathname: '/search/[slug]',
      params: { slug: `${search2}` },
    });
  };

  return (
    <>
      <View style={styles.container2}>
        <TextInput
          style={[styles.input]}
          placeholder="Pesquisar"
          value={search2}
          onChangeText={(text) => {
            setMes(text);
            if (error) {
              setError('');
            }
          }}
          cursorColor={'black'}
          inputMode="text"
          placeholderTextColor="#e7503b"
        />

        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#fcce9b' : '#e7503b',
            },
            styles.button,
          ]}
        >
          <Ionicons name="search" size={27} color="white" />
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    marginTop: isTablet ? 164 : 122,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 45,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 7,
  },
  input: {
    marginLeft: '1%',
    width: 310,
    paddingLeft: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'black',
  },
  errorText: {
    color: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '1%',
  },
});

export default SearchInput;
