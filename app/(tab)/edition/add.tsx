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
import { TypeCategory } from '@/@types/Category';
import { searchById } from '@/utils/axios/searchById';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { pushUpdateCategoryById } from '@/utils/axios/Category/pushUpdateCategoryById';
import { BlurView } from 'expo-blur';
import { pushCreateCategoryById } from '@/utils/axios/Category/pushCreateCategoryById';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';

function App() {
  const [data, setDataFetch] = useState<Partial<TypeCategory>>({
    nameCategory: '',
    descriptionCategory: '',
    showInMenu: false,
    imgCategory: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  // ----------------------  Select img category ----------------------------
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const newData = {
        ...data,
        imgCategory: result.assets[0].base64,
      };
      setDataFetch(newData);
    }
  };
  // ----------------------  Controller data change by input ----------------------------
  async function sendData() {
    const result = await pushCreateCategoryById(data);
    result.status;
    setModalVisible(true);
  }

  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/(edition)',
    });
  }

  // ----------------------  function to fetch data ----------------------------
  async function searchData() {
    const response = await searchById('Category', id);
    setDataFetch(response.data);
  }

  useEffect(() => {}, []);
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
        Criar Categoria
      </Text>
      {/* ----------------------  form imput  ---------------------------- */}
      <Foundation
        style={styles.iconClip}
        name="paperclip"
        size={35}
        color="black"
      />
      {/* ---------------------- input img Category  ---------------------------- */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fcce9b' : '#DB680B',
          },
          styles.button,
        ]}
        onPress={() => handleSelectImage(data?._id)}
      >
        <Text style={{ fontSize: 17 }}>Escolher Imagem</Text>
      </Pressable>
      <Image
        style={styles.image}
        source={{
          uri: `data:image/jpeg;base64,${data?.imgCategory}`,
        }}
        contentFit="cover"
      />
      <View style={{ marginBottom: 60 }}></View>
      {/* ---------------------- input name Category  ---------------------------- */}
      <View style={styles.groupCategory}>
        <Text style={styles.labelCategory}>Nome</Text>
        <Feather
          style={styles.iconEditDescription}
          name="edit"
          size={24}
          color="white"
        />
      </View>
      <TextInput
        style={styles.inputCategory}
        value={data?.nameCategory}
        onChangeText={(text) => {
          handleTextCategory(text);
        }}
      ></TextInput>
      {/* ---------------------- input description Category  ---------------------------- */}
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
              Categoria criada com sucesso!
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
  inputCategory: {
    backgroundColor: 'white',
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  labelCategory: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '65%',
    fontWeight: 'bold',
    color: 'white',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    width: '80%',
    color: 'white',
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e7503b',
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
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
    width: '75%',
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
    marginTop: 30,
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
  selectContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#e7503b',
    borderWidth: 2,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  dropdownContainer: {
    borderColor: '#e7503b',
    borderWidth: 2,
    borderRadius: 10,
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

export default gestureHandlerRootHOC(App);
