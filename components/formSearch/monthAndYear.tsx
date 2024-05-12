import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
function MonthYear({ fetchData, setRefreshing }: any) {
  const [search, setMes] = useState('');
  const [ano, setAno] = useState('');
  return (
    <View style={styles.container2}>
      <TextInput
        style={[styles.input]}
        placeholder="Pesquisar"
        value={search}
        onChangeText={setMes}
        cursorColor={'black'}
        inputMode="text"
        placeholderTextColor="#e7503b"
      />
      <Pressable
        onPress={() => {
          //Usar o setData
          // setRefreshing(true);
          router.push({
            pathname: '/(search)/[slug]',
            params: { slug: `${search}` },
          });
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fcce9b' : '#e7503b',
          },
          styles.button,
        ]}
      >
        <Ionicons name="search" size={27}></Ionicons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 45,
    paddingVertical: 6,
    marginTop: 106,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // margin: 1,
    // borderColor: '#e7503b',
    marginLeft: 7,
    // borderWidth: 2,
  },
  input: {
    marginLeft: '1%',
    width: 310,
    paddingLeft: 14,
    paddingVertical: 6,
    borderRadius: 10,
    margin: 1,
    borderWidth: 2,
    borderColor: '#e7503b',
    marginTop: 106,
    color: 'black',
  },
  input2: {
    marginLeft: '1%',
    width: 140,
    paddingLeft: 14,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 100,
    color: '#F6F2DA',
  },
});
export default MonthYear;
