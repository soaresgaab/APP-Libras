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
import { pushDeleteWordById } from '@/utils/axios/Words/pushDeleteWordById';
import ImageModal from '@/module/Image-modal';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Video } from 'expo-av';
import { storage } from '../../firebaseConfig'; 

function AppWord() {
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  let updatedSrc:string = '';
  let midiaselect:boolean = false;
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
  const [video, setVideo] = useState<string>('');
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
    //Excluir os arquivo no firebase storage-------------------
    console.log("video no sendData: ", video)
    if (video) {
      try {
        const filePath = "videos/" + video.replace('https://firebasestorage.googleapis.com/v0/b/videossignallibras.appspot.com/o/videos%2F', '').replace(/\?.*$/, '');
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        console.log(`File at ${filePath} deleted successfully.`);
        /*const storageRef = storage.ref(decodeURIComponent(filePath));
        await storageRef.delete();*/
      } catch (error) {
        console.error("Erro ao excluir o arquivo do Firebase Storage:", error);
      }
    }
    let videosDelete = await searchById('word_id', id);
    let videosUpdateDelete = videosDelete.data.wordDefinitions
      .filter(v => v.fileType === 'video')
      .map(v => v.src);
    if (!data.nameWord || !data.wordDefinitions.every(def => def.descriptionWordDefinition && def.category)) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha todos os campos obrigatórios antes de salvar.',
        [{ text: 'OK' }]
      );
      return; 
    }
    const updatedDefinitions = await Promise.all(
      data?.wordDefinitions.map(async (definition) => {
        if (definition.src && definition.fileType === 'video') {
          console.log("entrou nesse if aqui")
          try {
            const downloadURL = await uploadVideoToFirebase(definition.src);
            return {
              ...definition,
              src: downloadURL,
              fileType: 'video',
            };
          } catch (error) {
            console.error("Erro ao enviar o vídeo:", error);
            return definition; 
          }
        } else {
          return {
            ...definition,
            fileType: 'image',
          };
        }
      })
    );
    const newData = {
      ...data,
      wordDefinitions: updatedDefinitions,
    };
    setDataFetch(newData as TypeLibrasDataWithId);
    const result = await pushUpdateWordById(newData);
    console.log(result.data);
    try {
      for (const videoUrl of videosUpdateDelete) {
        const filePath = "videos/" + videoUrl.replace('https://firebasestorage.googleapis.com/v0/b/videossignallibras.appspot.com/o/videos%2F', '').replace(/\?.*$/, '');
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        console.log(`Arquivo excluído: ${videoUrl}`);
      }
    } catch (error) {
        console.error('Erro ao excluir vídeos:', error);
    }
    setModalVisible(true);
    /*const result = await pushUpdateWordById(data);
    console.log(result.data)
    setModalVisible(true);*/
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/(editionwords)',
    });
  }

  function handleNameWord(text: string) {
    setDataFetch((prev) => ({ ...prev, nameWord: text }));
  }

  async function deleteData() {
    /*const result = await pushDeleteWordById(data);
    console.log(result.status);
    setModalVisible(true);*/
    let videosDelete = data.wordDefinitions
      .filter(video => video.fileType === 'video')
      .map(video => video.src);
    const result = await pushDeleteWordById(data);
    console.log(result.status);
    //Excluir os arquivos no firebase storage-------------------
    console.log("arquivos deletados",videosDelete)
    try {
        for (const videoUrl of videosDelete) {
            const filePath = "videos/" + videoUrl.replace('https://firebasestorage.googleapis.com/v0/b/videossignallibras.appspot.com/o/videos%2F', '').replace(/\?.*$/, '');
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log(`Arquivo excluído: ${videoUrl}`);
        }
    } catch (error) {
        console.error('Erro ao excluir vídeos:', error);
    }
    setModalVisible(true);
  }
  async function deleteDataSignal(id: number | undefined) {
    const definitionToDelete = data.wordDefinitions?.find(definition => definition._id === id);
    if(definitionToDelete?.fileType === 'video'){
      setVideo(definitionToDelete.src);
    }
    const newData = {
      ...data,
      wordDefinitions: data!.wordDefinitions?.filter(
        (definition) => definition._id !== id,
      ),
    };
    setDataFetch(newData as TypeLibrasDataWithId);
  }
  // ----------------------  Upload de vídeo para o firebase storage ----------------------------
  async function uploadVideoToFirebase(uri: string) {
    console.log("na função upload firebase")
    try {
      const storageRef = ref(storage, `videos/${Date.now()}.mp4`);
      console.log('storageref:  ', storageRef);
      const fileBlob = await fetch(uri).then((r) => r.blob()); 
      await uploadBytes(storageRef, fileBlob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Erro ao fazer upload do vídeo:", error);
      throw error;
    }
  }
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 4],
        quality: 0.2,
        base64: true,
    });
    console.log('Mídia selecionada:', result);
    if (!result.canceled && result.assets.length > 0) {
      const { uri, base64, type } = result.assets[0];
      setMediaUri(uri);
      setMediaType(type === 'image' ? 'image' : 'video');

      if (type === 'image') {
        updatedSrc = result.assets[0].base64;
        midiaselect = true;
      } else if (type === 'video') {
        updatedSrc = uri;
        midiaselect = true;
      }
      const newData = {
        ...data,
        wordDefinitions: data!.wordDefinitions?.map((definition) => {
          if (definition._id === itemID) {
            return {
              ...definition,
              src: updatedSrc,
              fileType: type,
            };
          }
          return definition;
        }),
      };
      console.log("newsate : ", newData)
      setDataFetch(newData as TypeLibrasDataWithId);
    }

    /*const result: ImagePicker.ImagePickerResult =
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
    }*/
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
    console.log(newData);
    setDataFetch(newData as TypeLibrasDataWithId);
  }

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
        Editar Palavra
      </Text>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fcce9b' : '#e7503b',
          },
          styles.buttonTrash,
        ]}
        onPress={() => {
          deleteData();
        }}
      >
        <FontAwesome6
          styles={styles.iconTrash}
          name="trash-can"
          size={25}
          color="white"
        />
      </Pressable>
      {/* ----------------------  form imput  ---------------------------- */}
      <Foundation
        style={styles.iconClip}
        name="paperclip"
        size={35}
        color="black"
      />
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 25,
          width: '75%',
          fontWeight: 'bold',
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

      {data &&
        data.wordDefinitions?.map((definition, index) => (
          <View key={index}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#fcce9b' : '#e7503b',
                },
                styles.buttonTrash,
              ]}
              onPress={() => {
                deleteDataSignal(definition._id);
              }}
            >
              <FontAwesome6
                styles={styles.iconTrash}
                name="trash-can"
                size={25}
                color="white"
              />
            </Pressable>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 25,
                width: '85%',
                fontWeight: 'bold',
                marginTop: -10,
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

            {/* ---------------------- select image  ---------------------------- */}
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#fcce9b' : '#DB680B',
                },
                styles.button,
              ]}
              onPress={() => handleSelectImage(definition._id)}
            >
              <Text style={{ fontSize: 17 }}>Trocar mídia</Text>
            </Pressable>
            {midiaselect === false && (<Image
              style={styles.image}
              source={{
                uri: `data:image/jpeg;base64,${definition.src}`,
              }}
              contentFit="cover"
              placeholder={{ blurhash }}
              transition={1000}
            />)}
            {midiaselect === true && mediaType === 'image' && mediaUri && (
                <ImageModal
                    style={styles.image}
                    source={{ uri: mediaUri }}
                />
            )}
            
            {midiaselect === true && mediaType === 'video' && mediaUri && (
                <Video
                    source={{ uri: mediaUri }}
                    style={styles.video}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                />
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
