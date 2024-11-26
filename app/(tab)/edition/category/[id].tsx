import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
  Dimensions,
} from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '@/components/libras_componentes/separator';
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
import { pushDeleteCategoryById } from '@/utils/axios/Category/pushDeleteCategoryById';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

function App() {
  const [data, setDataFetch] = useState<TypeCategory>({
    _id: 0,
    nameCategory: '',
    descriptionCategory: '',
    showInMenu: false,
    imgCategory: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  // ----------------------  Controller dropdownpicker: create shortcut on main screen?  ----------------------------
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.showInMenu ? 'sim' : 'não');
  const [items, setItems] = useState([
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'não' },
  ]);
  // ----------------------  Select img category ----------------------------
  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    const result = await pushUpdateCategoryById(data);
    result.status;
    setModalVisible(true);
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/edition',
    });
  }

  async function deleteData() {
    const result = await pushDeleteCategoryById(data);
    result.status;
    setModalVisible(true);
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
      <Text style={styles.headerTitle}>Editar Categoria</Text>
      <Separator marginTopProp={15} marginBottomProp={10}></Separator>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}
      
      {/* ----------------------  form imput  ---------------------------- */}

      {/* ---------------------- input img Category  ---------------------------- */}
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
          uri: `data:image/jpeg;base64,${data.imgCategory}`,
        }}
        contentFit="cover"
      />
      <View style={{ marginBottom: 60 }}></View>
      {/* ---------------------- input name Category  ---------------------------- */}
      <Text style={styles.labelCategory}>Nome</Text>
      <TextInput
        style={styles.inputCategory}
        value={data?.nameCategory}
        onChangeText={(text) => {
          handleTextCategory(text);
        }}
      ></TextInput>
      {/* ---------------------- input description Category  ---------------------------- */}
      <Text style={styles.labelDescription}>Descrição</Text>
      <TextInput
        style={styles.inputDescription}
        value={data?.descriptionCategory}
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
  inputCategory: {
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
  labelCategory: {
    marginTop: 0,
    alignSelf: 'center',
    textAlign: 'left',
    paddingLeft: 18,
    fontSize: 20,
    width: 360,
    fontWeight: 'bold',
    color: '#03459e',
  },
  labelDescription: {
    marginTop: 15,
    alignSelf: 'center',
    textAlign: 'left',
    paddingLeft: 18,
    fontSize: 20,
    width: 360,
    fontWeight: 'bold',
    color: '#03459e',
  },
  headerTitle: {
    marginTop: 95,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
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
    width: 360,
    alignSelf: 'center',
    marginBottom: 20,
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
  dropdownContainer: {
    borderColor: '#3d9577',
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

export default gestureHandlerRootHOC(App);
