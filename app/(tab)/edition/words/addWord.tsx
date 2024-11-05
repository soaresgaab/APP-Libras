import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';
import { TypeCategory } from '@/@types/Category';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { pushCreateWordById } from '@/utils/axios/Words/pushCreateWordsById';
import ImageModal from '@/module/Image-modal';
import { Video } from 'expo-av';
import Separator from '@/components/libras_componentes/separator';
import { pushCreateSuggestionById } from '@/utils/axios/Suggestion/pushCreateSuggestionById';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

function AppWord() {
  const [data, setDataFetch] = useState<TypeLibrasDataWithId>({
    _id: 0,
    nameWord: '',
    wordDefinitions: [
      {
        _id: 0,
        descriptionWordDefinition: '',
        src: '',
        fileType: '',
        category: undefined,
      },
    ],
  });
  const [category, setCategory] = useState<TypeCategory[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();
  const blurhash = 'LRK{nc~DoMt7EKofj[a#-WWUayj?';
  // ----------------------  DropDawn logic ----------------------------

  const pickerStyle = {
    placeholderColor: 'white',
  };

  // ----------------------  Controller data change by input ----------------------------
  async function sendData() {
    setLoading(true);
    const result = await pushCreateSuggestionById(data);
    setLoading(false);
    result.data;
    setModalVisible(true);
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push('edition');
  }

  function handleNameWord(text: string) {
    setDataFetch((prev) => ({ ...prev, nameWord: text }));
  }

  async function deleteData() {
    setModalVisible(true);
  }

  // ----------------------  function to fetch data ----------------------------
  async function searchData() {
    // const response = await searchById('word_id', id);
    const category = await searchByRoute('category');
    setCategory(category.data);

    categorySelectNull(category.data[0]);
    // setDataFetch(response.data);
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
        aspect: [4, 4],
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

  // ----------------------  Upload de vídeo para o firebase storage ----------------------------

  // ----------------------  Controller data change by input ----------------------------
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
    setDataFetch(newData as TypeLibrasDataWithId);
  }

  function categorySelectNull(item: any) {
    const newData = {
      ...data,
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

  // ----------------------  start of component return  ----------------------------
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <Text style={styles.headerTitle}>Criar uma Palavra</Text>
      <Separator marginTopProp={10} marginBottomProp={10}></Separator>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}

      {/* ----------------------  form imput  ---------------------------- */}

      <Text style={styles.labelWord}>Nome:</Text>
      <TextInput
        style={styles.inputNameWord}
        value={data.nameWord}
        placeholder="Informe o nome da palavra"
        onChangeText={(text) => {
          handleNameWord(text);
        }}
      ></TextInput>
      <Separator marginTopProp={20} marginBottomProp={10}></Separator>
      {/* ---------------------- input description word  ---------------------------- */}

      {data &&
        data.wordDefinitions?.map((definition, index) => (
          <View key={index}>
            {/* ----------------------  form picker  ---------------------------- */}
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'left',
                fontSize: 25,
                paddingLeft: 18,
                fontWeight: 'bold',
                width: 360,
                color: '#03459e',
              }}
            >
              Sinal
            </Text>
            <Text style={styles.labelDescription}>Significado:</Text>
            <TextInput
              style={styles.inputDescription}
              placeholder="Informe o significado da palavra"
              value={definition.descriptionWordDefinition}
              onChangeText={(text) => {
                descriptionSinal(text, definition._id);
              }}
            ></TextInput>
            {/* ---------------------- input category  ---------------------------- */}

            <Text style={styles.labelDescription}>Categoria:</Text>

            <View style={styles.dropdown}>
              <Picker // Adicionando uma chave única para cada item
                prompt="Escolha uma categoria"
                style={{
                  fontSize: 18,
                  // backgroundColor: 'green',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderWidth: 1,
                }}
                mode="dialog"
                dropdownIconColor="green"
                selectedValue={definition.category}
                placeholder="Selecione uma categoria"
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
            {/* ---------------------- input category  ---------------------------- */}

            {/* ---------------------- select image  ---------------------------- */}

            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#beffe7' : 'white',
                },
                {
                  elevation: pressed ? 1 : 6,
                },
                styles.button,
              ]}
              onPress={() => handleSelectImage(definition._id)} // Chama a nova função handleSelectMedia
            >
              <Text style={{ fontSize: 17 }}>Selecionar Imagem</Text>
            </Pressable>
            <Image
              style={styles.image}
              source={{
                uri: `data:image/jpeg;base64,${definition.src}`,
              }}
              contentFit="cover"
              placeholder={{ blurhash }}
              transition={1000}
            />
          </View>
        ))}

      <Separator marginTopProp={25} marginBottomProp={10}></Separator>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#3d9577' : '#86c7aa',
          },
          {
            elevation: pressed ? 1 : 6,
          },
          styles.buttonSalvar,
        ]}
        onPress={() => {
          sendData();
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#03459e"
            style={{ paddingVertical: 3 }}
          />
        ) : (
          <Text style={{ fontSize: 18 }}>Salvar</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#86c7aa' : '#ffffff',
          },
          {
            elevation: pressed ? 1 : 6,
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
        <BlurView tint={'prominent'} intensity={60} style={styles.modalOverlay}>
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
    backgroundColor: '#edf8f4',
    width: 'auto',
    paddingVertical: 0,
  },
  headerTitle: {
    marginTop: isWeb ? 70 : 90,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  inputNameWord: {
    backgroundColor: 'white',
    width: 360,
    alignSelf: 'center',
    textAlign: 'left',
    paddingVertical: 6,
    paddingLeft: 11,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3d9577',
    color: 'Red',
    // fontWeight: 'bold',
    fontSize: 17,
    elevation: 6,
  },
  labelWord: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'left',
    paddingLeft: 18,
    fontSize: 20,
    width: 360,
    fontWeight: 'bold',
    color: '#03459e',
  },
  inputDescription: {
    backgroundColor: 'white',
    width: 360,
    alignSelf: 'center',
    textAlign: 'left',
    paddingVertical: 6,
    paddingLeft: 11,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3d9577',
    fontSize: 17,
    elevation: 6,
  },
  labelCategory: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    width: '65%',
    fontWeight: 'bold',
    color: 'black',
  },
  labelDescription: {
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 18,
    fontWeight: 'bold',
    width: 360,
    color: '#03459e',
  },
  iconClip: {
    marginTop: 0,
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
    width: 370,
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
    alignSelf: 'center',
    width: 190,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3d9577',
    marginBottom: 25,
  },
  buttonSalvar: {
    marginTop: 10,
    alignSelf: 'center',
    width: 190,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3d9577',
  },
  dropdown: {
    marginTop: 0,
    width: 360,
    height: isWeb ? 45 : 55,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3d9577',
    backgroundColor: 'white',
  },
  image: {
    width: 290,
    height: 180,
    marginTop: 18,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#3d9577',
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
    borderColor: '#3d9577',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3d9577',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  button: {
    width: 180,
    paddingVertical: 10,
    marginTop: 20,
    // paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3d9577',
  },
});

export default gestureHandlerRootHOC(AppWord);
