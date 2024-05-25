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
import { searchAxiosGetWords } from '@/components/axios/searchAxiosGet';
import { TypeLibrasData, TypeLibrasDataSinais } from '@/@types/LibrasData';
import { NoResultsComponent } from '@/components/formSearch/erroSearch';
import { Image } from 'expo-image';
import { DataLibrasReducer } from '@/utils/reducer/DataLibrasReducer';
import { initialStateDataLibrasReducer } from '../../utils/reducer/DataLibrasReducer';
import * as ImagePicker from 'expo-image-picker';

function App() {
  const [base64Image, setBase64Image] = useState('');
  const [data, setData] = useState<TypeLibrasData[]>();
  const [editable, setEditable] = useState<boolean>(false);
  const [updatedData, dispatchUpdateData] = useReducer(
    DataLibrasReducer,
    initialStateDataLibrasReducer,
  );
  const [refreshing, setRefreshing] = useState(true);
  const [ConfirmData, setConfirmData] = useState('');
  const { slug } = useLocalSearchParams();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const handleSelectImage = async (
    item: TypeLibrasData,
    item2: Partial<TypeLibrasData>,
  ) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.2,
        base64: true,
      });

    if (!result.canceled && result.assets[0].base64) {
      setBase64Image(result.assets[0].base64);

      dispatchUpdateData({
        type: 'changed3',
        payload: {
          _id: item._id,
          nameWord: item.nameWord,
          wordDefinitions: [
            {
              ...item2,
              _id: item2._id!,
              src: result.assets[0].base64,
            },
          ],
        },
      });
    }
  };

  async function searchData() {
    const response = await searchAxiosGetWords(slug);
    setConfirmData(response.data);
    if (response!.data) {
      response!.data.map((item: TypeLibrasData) => {
        dispatchUpdateData({
          type: 'added',
          payload: item,
        });
      });
      setData(response!.data);
    }
  }

  useEffect(() => {
    searchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <MonthYear></MonthYear>

      {/* {updatedData &&
        updatedData.map((item, index) => (
         
        ))} */}
      {updatedData.length > 0 && (
        <>
          <Text
            style={{
              marginTop: 10,
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 18,
              width: '95%',
            }}
          >
            {`Confira alguns significados para a palavra "${slug}" e seus respectivos sinais`}
          </Text>
          <Pressable
            style={{
              width: '100%',
            }}
            onPress={() => {
              setEditable(!editable);
              console.log(updatedData);
            }}
          >
            <Text
              style={{
                marginTop: 15,
                alignSelf: 'flex-end',
                backgroundColor: '#e7503b',
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 8,
                marginRight: 5,
              }}
            >
              {' '}
              Editar
            </Text>
          </Pressable>
        </>
      )}

      {updatedData &&
        updatedData.map((item: TypeLibrasData, index: number) => (
          <View key={`inner_${index}`}>
            <TextInput
              editable={editable}
              key={index}
              style={editable ? styles.input : styles.inputDisabled}
              value={item.nameWord}
              onChangeText={(text) => {
                dispatchUpdateData({
                  type: 'changed',
                  payload: {
                    _id: item._id,
                    nameWord: text,
                    wordDefinitions: item.wordDefinitions,
                  },
                });
              }}
            ></TextInput>
            {data &&
              item.wordDefinitions.map(
                (item2: Partial<TypeLibrasDataSinais>, innerindex: number) => (
                  <View key={`outer_${index}${innerindex}`}>
                    <View>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `data:image/jpeg;base64,${item2.src}`,
                        }}
                        contentFit="cover"
                        placeholder={{ blurhash }}
                        transition={1000}
                      />
                    </View>
                    {editable && (
                      <Pressable
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed ? '#fcce9b' : '#DB680B',
                          },
                          styles.button,
                        ]}
                        onPress={() => handleSelectImage(item, item2)}
                      >
                        <Text style={{ fontSize: 17 }}>
                          Selecionar Nova Imagem
                        </Text>
                      </Pressable>
                    )}
                    {/* aki msm  */}
                    <TextInput
                      editable={editable}
                      key={index}
                      style={editable ? styles.input : styles.inputDisabled2}
                      value={item2.category?.nameCategory}
                      onChangeText={(text) => {
                        dispatchUpdateData({
                          type: 'changed2',
                          payload: {
                            _id: item._id,
                            nameWord: item.nameWord,
                            wordDefinitions: [
                              {
                                ...item2,
                                _id: item2._id!,
                                category: {
                                  ...item2.category!,
                                  nameCategory: text,
                                },
                              },
                            ],
                          },
                        });
                      }}
                    ></TextInput>

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
                      {item2.descriptionWordDefinition !== null
                        ? item2.descriptionWordDefinition
                        : 'oi'}
                    </Text>
                    <View style={styles.borda}></View>
                  </View>
                ),
              )}
          </View>
        ))}
      {updatedData.length === 0 && (
        <NoResultsComponent slug={slug}></NoResultsComponent>
      )}
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
  button: {
    width: 250,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  image: {
    width: 290,
    height: 280,
    marginTop: 18,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: 15,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 14,
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
  inputDisabled: {
    marginTop: 22,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    width: '75%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'red',
  },

  inputDisabled2: {
    marginTop: 22,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    width: '75%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'black',
  },
  borda: {
    marginBottom: 50,
    width: '80%',
    alignSelf: 'center',
    borderTopWidth: 0,
    borderTopColor: '#cac9c99c',
  },
});

export default gestureHandlerRootHOC(App);
