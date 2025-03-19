import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
} from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { TypeCategory } from '@/@types/Category';
import { router } from 'expo-router';
import { pushUpdateCategoryById } from '@/utils/axios/Category/pushUpdateCategoryById';
import { BlurView } from 'expo-blur';
import { pushCreateCategoryById } from '@/utils/axios/Category/pushCreateCategoryById';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import Separator from '@/components/libras_componentes/separator';
import useDeviceType from '@/hooks/useDeviceType';
const { isPhone, isTablet, isWeb } = useDeviceType();

function App() {
  const [data, setDataFetch] = useState<Partial<TypeCategory>>({
    nameCategory: '',
    descriptionCategory: '',
    showInMenu: false,
    imgCategory: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const blurhash = 'LRK{nc~DoMt7EKofj[a#-WWUayj?';
  const { id } = useLocalSearchParams();

  // ----------------------  Select img category ----------------------------
  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.3,
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
    setLoading(true);
    const result = await pushCreateCategoryById(data);
    setLoading(false);
    setModalVisible(true);
  }

  function closeModalAndBack() {
    setModalVisible(false);
    router.push('/edition');
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
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Criar Categoria</Text>
      <Separator marginTopProp={10} marginBottomProp={10}></Separator>
      {/* ---------------------- input name Category  ---------------------------- */}

      <Text style={styles.labelCategory}>Nome</Text>

      <TextInput
        style={styles.inputCategory}
        value={data?.nameCategory}
        placeholder="Informe a categoria"
        onChangeText={(text) => {
          handleTextCategory(text);
        }}
      ></TextInput>
      {/* ---------------------- input description Category  ---------------------------- */}

      <Text style={styles.labelDescription}>Descrição</Text>

      <TextInput
        style={styles.inputDescription}
        value={data?.descriptionCategory}
        placeholder="Informe uma descrição para a categoria"
        multiline={true}
        onChangeText={(text) => {
          handleTextDescription(text);
        }}
      ></TextInput>
      {/* ---------------------- input img Category  ---------------------------- */}
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
        onPress={() => handleSelectImage()}
      >
        <Text style={{ fontSize: 17 }}>Selecionar Imagem</Text>
      </Pressable>
      <Image
        style={styles.image}
        source={{
          uri: `data:image/jpeg;base64,${data?.imgCategory}`,
        }}
        contentFit="fill"
        placeholder={{ blurhash }}
      />
      {/* ---------------------- buttons to create Category  ---------------------------- */}
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
        <BlurView
          tint={'systemChromeMaterialDark'}
          intensity={60}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Categoria criada com sucesso!</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#86c7aa' : '#ffffff',
                },
                {
                  elevation: pressed ? 1 : 6,
                },
                styles.modalButton,
              ]}
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
    backgroundColor: '#ecf7f4',
    width: 'auto',
  },
  headerTitle: {
    marginTop: isWeb ? 95 : 75,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  inputCategory: {
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
  inputDescription: {
    justifyContent: 'space-around',
    textAlignVertical: 'top',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    width: 360,
    height: 100,
    alignSelf: 'center',
    textAlign: 'left',
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3d9577',
    color: 'Red',
    fontSize: 15,
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
    marginTop: 20,
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
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  groupCategory: {
    marginTop: 5,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'yellow',
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

export default gestureHandlerRootHOC(App);
