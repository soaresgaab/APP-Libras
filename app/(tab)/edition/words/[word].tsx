import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { searchById } from '@/utils/axios/searchById';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { pushUpdateCategoryById } from '@/utils/axios/Category/pushUpdateCategoryById';
import { BlurView } from 'expo-blur';
import { pushDeleteCategoryById } from '@/utils/axios/Category/pushDeleteCategoryById';
import { TypeLibrasData, TypeLibrasDataWithId } from '@/@types/LibrasData';
import { TypeCategory } from '@/@types/Category';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { pushUpdateWordById } from '@/utils/axios/Words/pushUpdateWordById';
import { pushAddSignalById } from '@/utils/axios/Words/pushAddSignalById';
import ImageModal from '@/module/Image-modal';
import { RadioButton } from 'react-native-paper';

function AppWord() {
  const [youtubeLinkUri, setYoutubeLinkUri] = useState<string | undefined>('');
  const [midiaStorageType, setMidiaStorageType] = useState<
    'upload' | 'linkVideo' | null
  >(null);

  const [data, setDataFetch] = useState<TypeLibrasDataWithId>({
    _id: undefined,
    nameWord: 'nada',
    wordDefinitions: [
      {
        _id: undefined,
        descriptionWordDefinition: '',
        src: '',
        fileType: '',
        category: undefined,
      },
    ],
  });
  const [category, setCategory] = useState<TypeCategory[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  // ----------------------  DropDawn logic ----------------------------

  const pickerStyle = {
    placeholderColor: 'white',
  };

  // ----------------------  Controller data change by input ----------------------------
  async function sendData() {
    if (
      !data.nameWord ||
      !data.wordDefinitions!.every(
        (def) => def.descriptionWordDefinition && def.category,
      )
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha todos os campos obrigatórios antes de salvar.',
        [{ text: 'OK' }],
      );
      return;
    }
    let updatedDefinitions = data.wordDefinitions;
    if (midiaStorageType === 'upload') {
      updatedDefinitions = await Promise.all(
        data?.wordDefinitions!.map(async (definition) => {
          return {
            ...definition,
            fileType: 'image',
          };
        }),
      );
    } else {
      if (midiaStorageType === 'linkVideo') {
        console.log('entrou nesse else');
        updatedDefinitions = await Promise.all(
          data?.wordDefinitions!.map(async (definition) => {
            try {
              return {
                ...definition,
                src: youtubeLinkUri,
                fileType: 'video',
              };
            } catch (error) {
              console.error('Erro no processamento do link:', error);
              return definition;
            }
          }),
        );
      }
    }
    const newData = {
      ...data,
      wordDefinitions: updatedDefinitions,
    };
    setDataFetch(newData as TypeLibrasDataWithId);
    const result = await pushAddSignalById(newData);
    setModalVisible(true);
  }

  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/editionwords',
    });
  }

  function handleNameWord(text: string) {
    setDataFetch((prev) => ({ ...prev, nameWord: text }));
  }

  async function deleteData() {
    // const result = await pushDeleteCategoryById(data);
    // (result.status);
    setModalVisible(true);
  }

  function descriptionSinal(item: string, definitionID: number | undefined) {
    const newData = {
      ...data,
      wordDefinitions: data!.wordDefinitions?.map((definition, index) => {
        if (index === 0) {
          return {
            ...definition,
            descriptionWordDefinition: item,
          };
        }
        return definition;
      }),
    };
    newData;
    setDataFetch(newData as TypeLibrasDataWithId);
  }

  // ----------------------  function to fetch data ----------------------------
  async function searchData() {
    // const response = await searchById('word_id', id);
    const category = await searchByRoute('category');
    setCategory(category.data);
    categorySelectNull(category.data[0]);
    // setDataFetch(response.data)
  }

  function categorySelectNull(item: any) {
    const newData = {
      ...data,
      _id: id,
      wordDefinitions: data!.wordDefinitions?.map((definition, index) => {
        if (index === 0) {
          return {
            ...definition,
            category: item._id,
          };
        }
        return definition;
      }),
    };
    setDataFetch(newData as TypeLibrasDataWithId);
  }

  function categorySelect(item: number, definitionID: number | undefined) {
    const newData = {
      ...data,
      wordDefinitions: data!.wordDefinitions?.map((definition) => {
        if (definition._id === definitionID) {
          return {
            ...definition,
            category: item,
          };
        }
        return definition;
      }),
    };
    setDataFetch(newData as TypeLibrasDataWithId);
  }

  useEffect(() => {
    searchData();
  }, []);
  // ----------------------  Image Picker function ----------------------------
  const handleSelectImage = async (itemID: number | undefined) => {
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
        // aspect: [4, 4],
        quality: 0.2,
        base64: true,
      });

    if (!result.canceled && result.assets[0].base64) {
      const newData = {
        ...data,
        wordDefinitions: data!.wordDefinitions?.map((definition) => {
          if (definition._id === itemID) {
            return {
              ...definition,
              src: result.assets[0].base64,
            };
          }
          return definition;
        }),
      };
      setDataFetch(newData as TypeLibrasDataWithId);
    }
  };

  // ----------------------  Controller data change by input ----------------------------
  //   function handleTextCategory(text: string) {
  //     const newData = { ...data, nameCategory: text };
  //     setDataFetch(newData);
  //   }
  //   function handleTextDescription(text: string) {
  //     const newData = { ...data, descriptionCategory: text };
  //     setDataFetch(newData);
  //   }
  // ----------------------  start of component return  ----------------------------
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <SearchInput></SearchInput>
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
        Adicionar Sinal
      </Text>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}

      {/* ----------------------  form imput  ---------------------------- */}
      <Foundation
        style={styles.iconClip}
        name="paperclip"
        size={35}
        color="black"
      />

      {data &&
        data.wordDefinitions?.map((definition, index) => (
          <View key={index}>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 25,
                width: '85%',
                fontWeight: 'bold',
              }}
            >
              Sinal
            </Text>
            <View style={styles.groupDescription}>
              <Text style={styles.labelDescription}>Descrição do sinal</Text>
              <Feather
                style={styles.iconEditDescription}
                name="edit"
                size={24}
                color="white"
              />
            </View>
            <TextInput
              style={styles.inputDescription}
              value={definition.descriptionWordDefinition}
              onChangeText={(text) => {
                descriptionSinal(text, definition._id);
              }}
            ></TextInput>
            {/* ----------------------  form picker  ---------------------------- */}
            <View style={styles.groupDescription}>
              <Text style={styles.labelCategory}>Categoria</Text>
              <Feather
                style={styles.iconEditDescription}
                name="edit"
                size={24}
                color="white"
              />
            </View>
            <View style={styles.dropdown}>
              <Picker // Adicionando uma chave única para cada item
                prompt="Escolha uma categoria"
                style={{ fontSize: 18 }}
                mode="dialog"
                dropdownIconColor="black"
                dropdownIconRippleColor="#fcce9b"
                selectedValue={definition.category}
                onValueChange={(itemValue, itemIndex) => {
                  // setSelectedCategory(itemValue);
                  categorySelect(itemValue, definition._id);
                }}
              >
                {category?.map((category, index2) => {
                  return (
                    <Picker.Item
                      key={index2}
                      label={category.nameCategory}
                      value={category._id}
                    />
                  );
                })}
              </Picker>
            </View>

            {/* ---------------------- Radio Buttons para selecionar Imagem ou Vídeo ---------------------------- */}
            <Text style={styles.label}>Selecione o tipo de mídia:</Text>
            <View style={styles.radioContainer}>
              <View style={styles.radioItem}>
                <RadioButton
                  value="upload"
                  status={
                    midiaStorageType === 'upload' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setMidiaStorageType('upload')}
                />
                <Text>Upload da mídia</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton
                  value="linkVideo"
                  status={
                    midiaStorageType === 'linkVideo' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setMidiaStorageType('linkVideo')}
                />
                <Text>Link do Youtube</Text>
              </View>
            </View>

            {/* ---------------------- select image - opção Upload de mídia ---------------------------- */}
            {midiaStorageType === 'upload' && (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#fcce9b' : '#DB680B',
                  },
                  styles.button,
                ]}
                onPress={() => handleSelectImage(definition._id)}
              >
                <Text style={{ fontSize: 17 }}>Selecionar mídia</Text>
              </Pressable>
            )}
            {midiaStorageType === 'upload' && (
              <ImageModal
                style={styles.image}
                source={{
                  uri: `data:image/jpeg;base64,${definition.src}`,
                }}
              />
            )}

            {/* ---------------------- Se a opção Link do youtube for selecionada  ---------------------------- */}
            {midiaStorageType === 'linkVideo' && (
              <View>
                <Text style={styles.label}>
                  Cole o link do vídeo do YouTube:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://www.youtube.com/..."
                  value={youtubeLinkUri}
                  onChangeText={(text) => setYoutubeLinkUri(text)}
                />
              </View>
            )}
            <View style={{ marginBottom: 60 }}></View>
          </View>
        ))}

      {/* ---------------------- input name Category  ---------------------------- */}
      {/* <View style={styles.groupCategory}>
        <Text style={styles.labelCategory}>Nome2</Text>
        <Feather
          style={styles.iconEditDescription}
          name="edit"
          size={24}
          color="white"
        />
      </View>
      <TextInput
        style={styles.inputNameWord}
        value={data?.nameWord}
        onChangeText={(text) => {
          handleTextCategory(text);
        }}
      ></TextInput> */}
      {/* ---------------------- input description Category  ---------------------------- */}
      {/* <View style={styles.groupDescription}>
        <Text style={styles.labelDescription}>Descrição do sinal</Text>
        <Feather
          style={styles.iconEditDescription}
          name="edit"
          size={24}
          color="#e7503b"
        />
      </View>
      <ScrollView>
        <TextInput
          style={styles.inputDescription}
          value={data?.nameWord}
          multiline={true}
          onChangeText={(text) => {
            handleTextDescription(text);
          }}
        ></TextInput>
      </ScrollView> */}
      {/* ---------------------- buttons to create Category  ---------------------------- */}

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#6ca5f0' : '#a9caf5',
          },
          styles.buttonSalvar,
        ]}
        onPress={() => {
          sendData();
        }}
      >
        <Text style={{ fontSize: 18 }}>Salvar</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#6ca5f0' : '#f5f5f5',
          },
          styles.buttonCancelar,
        ]}
        onPress={() => {
          router.dismiss(1);
        }}
      >
        <Text style={{ fontSize: 18 }}>Cancelar</Text>
      </Pressable>
      {/* ---------------------- confirmation modal ---------------------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          tint={'systemChromeMaterialDark'}
          intensity={60}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Alteração realizada com sucesso!
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => closeModalAndBack()}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
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
  inputNameWord: {
    backgroundColor: 'white',
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontSize: 20,
    marginBottom: 40,
  },
  inputDescription: {
    justifyContent: 'space-around',
    textAlignVertical: 'top',
    paddingHorizontal: 6,
    backgroundColor: 'white',
    width: '85%',
    height: 70,
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  labelCategory: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 18,
    width: '80%',
    fontWeight: 'bold',
    color: 'white',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: 'white',
  },
  iconClip: {
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e7503b',
  },
  iconEditDescription: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  groupDescription: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e7503b',
    marginTop: 10,
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  groupCategory: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e7503b',
    marginTop: 10,
    flexDirection: 'row',
    width: '85%',
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
  buttonCancelar: {
    marginTop: 15,
    alignSelf: 'flex-end',
    width: 190,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: '5%',
    borderWidth: 2,
    borderColor: '#6ca5f0',
    marginBottom: 25,
  },
  buttonSalvar: {
    alignSelf: 'flex-end',
    width: 190,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: '5%',
    borderWidth: 2,
    borderColor: '#6ca5f0',
  },
  dropdown: {
    marginTop: 0,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    backgroundColor: 'white',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
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
  video: {
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
  //-------------------------  modal style---------------------------
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0s)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e7503b',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#e7503b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: 150,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default gestureHandlerRootHOC(AppWord);
