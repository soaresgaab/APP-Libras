import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import MonthYear from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { TypeCategory } from '@/@types/Category';
import { searchById } from '@/components/axios/searchById';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

function App() {
  const [data, setDataFetch] = useState<TypeCategory>({
    _id: 0,
    nameCategory: '',
    descriptionCategory: '',
  });
  const { id } = useLocalSearchParams();

  async function searchData() {
    const response = await searchById('Category', id);
    setDataFetch(response.data);
  }

  useEffect(() => {
    searchData();
  }, []);

  function handleTextCategory(text: string) {
    const newData = { ...data, nameCategory: text };
    setDataFetch(newData);
  }
  function handleTextDescription(text: string) {
    const newData = { ...data, descriptionCategory: text };
    setDataFetch(newData);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <MonthYear></MonthYear>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        Editar Categoria
      </Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fcce9b' : '#e7503b',
          },
          styles.buttonTrash,
        ]}
      >
        <FontAwesome6
          styles={styles.iconTrash}
          name="trash-can"
          size={25}
          color="white"
        />
      </Pressable>

      <Foundation
        style={styles.iconClip}
        name="paperclip"
        size={35}
        color="black"
      />
      <View style={styles.groupDescription}>
        <Text style={styles.labelCategory}>Nome</Text>
        <Feather
          style={styles.iconEditDescription}
          name="edit"
          size={24}
          color="#e7503b"
        />
      </View>
      <TextInput
        style={styles.inputCategory}
        value={data?.nameCategory}
        onChangeText={(text) => {
          handleTextCategory(text);
        }}
      ></TextInput>
      <View style={styles.groupDescription}>
        <Text style={styles.labelDescription}>Descrição</Text>
        <Feather
          style={styles.iconEditDescription}
          name="edit"
          size={24}
          color="#e7503b"
        />
      </View>
      <TextInput
        style={styles.inputDescription}
        value={data?.descriptionCategory}
        multiline={true}
        onChangeText={(text) => {
          handleTextDescription(text);
        }}
      ></TextInput>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    width: 'auto',
    paddingVertical: 0,
  },
  inputCategory: {
    backgroundColor: 'white',
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputDescription: {
    justifyContent: 'space-around',
    textAlignVertical: 'top',
    paddingHorizontal: 6,
    backgroundColor: 'white',
    width: '90%',
    height: 140,
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 15,
  },
  labelCategory: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '65%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '80%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  iconClip: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  iconEditDescription: {
    alignSelf: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  groupDescription: {
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconTrash: {},
  buttonTrash: {
    alignSelf: 'flex-end',
    width: 45,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: '5%',
  },
});

export default gestureHandlerRootHOC(App);
