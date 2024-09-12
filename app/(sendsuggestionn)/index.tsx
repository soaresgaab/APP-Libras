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
import { TypeLibrasData, TypeLibrasDataWithId } from '@/@types/LibrasData';
import { TypeCategory } from '@/@types/Category';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { pushCreateSuggestionById } from '@/utils/axios/Suggestion/pushCreateSuggestionById';
import Joyride, {STATUS} from "react-joyride";

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
  };4

  // ----------------------  tour of onboarding ----------------------------
  const [{run, steps}, setState] = useState({
    run: true,
    steps: [
      {
        content: <h2>Conhece algum sinal que ainda não está no glossário? Contribua para o crescimento e a melhoria do aplicativo enviando a sua sugestão!</h2>,
        locale: {skip: <strong>SKIP</strong>},
        placement: "center",
        target: "body"
      },
      {
        content: <h2>Digite o nome da palavra que deseja adicionar</h2>,
        placement: "center",
        target: "#step-nameword",
      },
      {
        content: <h2>Adicione uma breve descrição para explicar o significado da palavra.</h2>,
        placement: "center",
        target: "#step-descriptionword",
      },
      {
        content: <h2>Escolha uma categoria para classificar esta palavra.</h2>,
        placement: "center",
        target: "#step-category",
      },
      {
        content: <h2>Selecione uma imagem representando o sinal da palavra.</h2>,
        placement: "center",
        target: "#step-image",
      },
    ]
  })

  // ----------------------  Controller data change by input ----------------------------
  async function sendData() {
    const result = await pushCreateSuggestionById(data);
    console.log(result.data);
    setModalVisible(true);
  }
  function closeModalAndBack() {
    setModalVisible(false);
    router.push({
      pathname: '/',
    });
  }

  function handleNameWord(text: string) {
    setDataFetch((prev) => ({ ...prev, nameWord: text }));
  }

  async function deleteData() {
    // const 2result = await pushDeleteCategoryById(data);
    // console.log(result.status);
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
    console.log(newData);
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
      <Joyride 
        continuous
        callback={() => {}}
        run={run}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          back: 'Voltar', 
          close: 'Fechar', 
          last: 'Concluir', 
          next: 'Próximo', 
          skip: 'Pular', 
        }}
        styles={{
          options: {
            zIndex: 10000,
            backgroundColor: 'white', 
            arrowColor: '#E7D75D', 
            textColor: '#65160B', 
            width: 300, 
            padding: 10, 
            borderRadius: 10, 
            beaconSize: 20, 
            fontFamily: 'YourCustomFont, Georgia',
            fontSize: 20,
          },
          buttonNext: {
            backgroundColor: '#59C170', 
            color: '#fff', 
            borderRadius: 5,
            padding: '8px 16px', 
            fontFamily: 'YourCustomFont, sans-serif', 
            border: 'none', 
          },
          buttonBack: {
            backgroundColor: '#007bff', 
            color: '#fff',
            borderRadius: 5,
            padding: '8px 16px',
            fontFamily: 'YourCustomFont, sans-serif',
            border: 'none',
          },
          buttonSkip: {
            backgroundColor: '#E7503B', 
            color: '#fff',
            borderRadius: 5,
            padding: '8px 16px',
            fontFamily: 'YourCustomFont, sans-serif',
            border: 'none',
          },
          buttonClose: {
            color: '#ff0000', 
            fontFamily: 'YourCustomFont, sans-serif',
          }
        }}       
      />
      <Text
        style={{
          marginTop: 164,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 25,
          width: '85%',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        enviar sugestão de Palavra
      </Text>
      {/* ----------------------  Button and icon to exclude  ---------------------------- */}

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
          fontSize: 20,
          width: '85%',
          fontWeight: 'bold',
        }}
      >
        Nome da Palavra
      </Text>
      <TextInput
        id={'step-nameword'}
        style={styles.inputNameWord}
        value={data.nameWord}
        multiline={true}
        onChangeText={(text) => {
          handleNameWord(text);
        }}
      ></TextInput>
      {/* ---------------------- input description word  ---------------------------- */}

      {data &&
        data.wordDefinitions?.map((definition, index) => (
          <View key={index}>
            {/* ----------------------  form picker  ---------------------------- */}
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
              <Text style={styles.labelDescription}>Significado</Text>
              <Feather
                style={styles.iconEditDescription}
                name="edit"
                size={24}
                color="black"
              />
            </View>
            <TextInput
              id={'step-descriptionword'}
              multiline={true}
              placeholder="ex: esse termo se refere a uma expressão regional"
              style={styles.inputDescription}
              value={definition.descriptionWordDefinition}
              onChangeText={(text) => {
                descriptionSinal(text, definition._id);
              }}
            ></TextInput>
            <View style={styles.groupDescription}>
              <Text style={styles.labelDescription}>Categoria</Text>
              <Feather
                style={styles.iconEditDescription}
                name="edit"
                size={24}
                color="white"
              />
            </View>
            <View style={styles.dropdown}>
              <Picker // Adicionando uma chave única para cada item
                id={'step-category'}
                prompt="Escolha uma categoria"
                style={{ fontSize: 18 }}
                mode="dialog"
                dropdownIconColor="black"
                dropdownIconRippleColor="#fcce9b"
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
              <Text style={{ fontSize: 17 }}>Selecionar Imagem</Text>
            </Pressable>
            <Image
              id={'step-image'}
              style={styles.image}
              source={{
                uri: `data:image/jpeg;base64,${definition.src}`,
              }}
              contentFit="cover"
              placeholder={{ blurhash }}
              transition={1000}
            />
            <View style={{ marginBottom: 60 }}></View>
          </View>
        ))}

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
        <Text style={{ fontSize: 18 }}>Enviar</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#6ca5f0' : '#f5f5f5',
          },
          styles.buttonCancelar,
        ]}
        onPress={() => {
          router.push('/');
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
    backgroundColor: '#F6F2DA',
    width: 'auto',
    paddingVertical: 0,
  },
  inputNameWord: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontSize: 20,
    marginBottom: 20,
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e7503b',
    color: 'Red',
    fontWeight: 'bold',
    fontSize: 15,
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
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 18,
    width: '80%',
    fontWeight: 'bold',
    color: 'black',
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
    color: 'black',
  },
  groupDescription: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: '#e7503b',
    marginTop: 10,
    marginBottom: 4,
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
    // borderTopRightRadius: 0,
    // borderTopLeftRadius: 0,
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
