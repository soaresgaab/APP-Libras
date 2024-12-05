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
import { pushUpdateCategoryById } from '@/utils/axios/Category/pushUpdateCategoryById';
import { BlurView } from 'expo-blur';
import { pushDeleteCategoryById } from '@/utils/axios/Category/pushDeleteCategoryById';
import { TypeCategory } from '@/@types/Category';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { pushUpdateWordById } from '@/utils/axios/Words/pushUpdateWordById';
import { pushAddSignalById } from '@/utils/axios/Words/pushAddSignalById';
import { TypeSuggestion } from '@/@types/LibrasData';
import DropDownPicker from 'react-native-dropdown-picker';


function AppWord() {
  const [data, setDataFetch] = useState<TypeSuggestion>({
    _id: 0,
    nameSuggestion: '',
    descriptionSuggestion: '',
    showInMenu: false,
    imgSuggestion: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.showInMenu ? 'sim' : 'não');

  const [items, setItems] = useState([
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'não' },
  ]);
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  // ----------------------  DropDawn logic ----------------------------

  const pickerStyle = {
    placeholderColor: 'white',
  };

  // ----------------------  Controller data change by input ----------------------------
  async function sendData() {
    const result = await pushAddSignalById(data);
    result.data;
    setModalVisible(true);
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/edition',
    });
  }

  // ----------------------  function to fetch data ----------------------------
  async function searchData() {
    const response = await searchById('Category', id);
    setDataFetch(response.data);
    setValue(response.data.showInMenu ? 'sim' : 'não');
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
        imgSuggestion: result.assets[0].base64,
      };
      setDataFetch(newData);
    }
  };

  function handleTextSuggestion(text: string) {
    const newData = { ...data, nameSuggestion: text };
    setDataFetch(newData);
  }
  function handleTextDescription(text: string) {
    const newData = { ...data, descriptionSuggestion: text };
    setDataFetch(newData);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <Text
        style={{
          marginTop: 20,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 26,
          width: '90%',
          fontWeight: 'bold',
          color: '#03459e',
        }}
      >
        Editar Sugestão
      </Text>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}
      <Text style={styles.labelDescription}>Nome</Text>
      <TextInput
        style={styles.inputDescription}
        value={data?.nameSuggestion}
        onChangeText={(text) => {
          handleTextSuggestion(text);
        }}
      ></TextInput>
      {/* ---------------------- input description Category  ---------------------------- */}
      <Text style={styles.labelDescription}>Descrição</Text>
      <TextInput
        style={styles.inputDescription}
        value={data?.descriptionSuggestion}
        multiline={true}
        onChangeText={(text) => {
          handleTextDescription(text);
        }}
      ></TextInput>
      {/* ---------------------- create shortcut on main screen?  ---------------------------- */}
      <Text style={styles.labelDescription}>Criar card na tela inicial?</Text>
      <View style={styles.selectContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Selecione uma opção"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      {data.showInMenu}
      {/* ---------------------- select image  ---------------------------- */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#86c7aa' : '#ffffff',
          },
          styles.button,
        ]}
        onPress={() => handleSelectImage(data._id)}
      >
        <Text style={{ fontSize: 17 }}>Trocar Imagem</Text>
      </Pressable>
      <Image
        style={styles.image}
        source={{
          uri: `data:image/jpeg;base64,${data.imgSuggestion}`,
        }}
        contentFit="cover"
        placeholder={{ blurhash }}
        transition={1000}
      />
      <View style={{ marginBottom: 60 }}></View>

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
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3d9577',
    fontWeight: 'bold',
    fontSize: 15,
  },
  labelCategory: {
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  labelDescription: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: '#03459e',
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
  selectContainer: {
    width: 360,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#3d9577',
    borderWidth: 2,
    borderRadius: 10,
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
