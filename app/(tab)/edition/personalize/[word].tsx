import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
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
import Separator from '@/components/libras_componentes/separator';
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
import { pushDeleteWordById } from '@/utils/axios/Words/pushDeleteWordById';

function AppWord() {
  const [data, setDataFetch] = useState<TypeLibrasDataWithId>({
    _id: undefined,
    nameWord: '',
    wordDefinitions: [
      {
        _id: undefined,
        descriptionWordDefinition: '',
        src: '',
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
    const result = await pushUpdateWordById(data);
    result.data;
    setModalVisible(true);
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/edition',
    });
  }

  function handleNameWord(text: string) {
    setDataFetch((prev) => ({ ...prev, nameWord: text }));
  }

  async function deleteData() {
    const result = await pushDeleteWordById(data);
    result.status;
    setModalVisible(true);
  }
  async function deleteDataSignal(id: number | undefined) {
    const newData = {
      ...data,
      wordDefinitions: data!.wordDefinitions?.filter(
        (definition) => definition._id !== id,
      ),
    };
    setDataFetch(newData as TypeLibrasDataWithId);
  }
  // ----------------------  function to fetch data ----------------------------

  // ----------------------  function to fetch data ----------------------------
  async function searchData() {
    const response = await searchById('word_id', id);
    const category = await searchByRoute('category');
    setCategory(category.data);
    setDataFetch(response.data);
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

  function descriptionSinal(item: string, definitionID: number | undefined) {
    const newData = {
      ...data,
      wordDefinitions: data!.wordDefinitions?.map((definition, index) => {
        if (definition._id === definitionID) {
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

  // ----------------------  Controller data change by input ----------------------------
  function handleTextCategory(text: string) {
    const newData = { ...data, nameCategory: text };
    setDataFetch(newData);
  }
  function handleTextDescription(text: string) {
    const newData = { ...data, descriptionCategory: text };
    setDataFetch(newData);
  }
  // ----------------------  start of component return  ----------------------------
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <Text style={styles.headerTitle}>Editar Palavra</Text>
      <Separator marginTopProp={15} marginBottomProp={10}></Separator>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}

      {/* ----------------------  form imput  ---------------------------- */}

      <Text
        style={{
          marginTop: 20,
          alignSelf: 'center',
          textAlign: 'left',
          paddingLeft: 18,
          fontSize: 20,
          width: 360,
          fontWeight: 'bold',
          color: '#03459e',
        }}
      >
        Nome
      </Text>
      <TextInput
        style={styles.inputNameWord}
        value={data.nameWord}
        multiline={true}
        onChangeText={(text) => {
          handleNameWord(text);
        }}
      ></TextInput>

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
      <View style={styles.groupDescription}>
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
            text;
          }}
        ></TextInput>
      </ScrollView>
      {/* ---------------------- buttons to create Category  ---------------------------- */}

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#3d9577' : '#86c7aa',
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
            backgroundColor: pressed ? '#86c7aa' : '#ffffff',
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
    backgroundColor: '#edf8f4',
    width: 'auto',
    paddingVertical: 0,
  },
  inputNameWord: {
    backgroundColor: 'white',
    width: 360,
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    paddingLeft: 11,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3d9577',
    color: 'Red',
    fontSize: 17,
    elevation: 6,
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
  headerTitle: {
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  iconClip: {
    marginTop: -25,
    marginBottom: 0,
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
