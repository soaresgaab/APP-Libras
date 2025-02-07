import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { CreateButton } from '../createData/create-Button';
import { TypeLibrasData, TypeLibrasDataSuggestion } from '@/@types/LibrasData';
import ImageModal from '@/module/Image-modal';
import Separator from '../libras_componentes/separator';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

const SuggestionViewerEdition = ({
  data,
}: {
  data: TypeLibrasDataSuggestion[] | undefined;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [idSelected, setSelectedId] = useState(0);

  const [filter, setFilter] = useState<string>('');
  const filteredItems = (data || []).filter((item) =>
    item.nameWord!.toLowerCase().includes(filter.toLowerCase()),
  );
  console.log(data, filteredItems);

  function deleteSuggestion(id: any) {
    console.log(idSelected);
    setModalVisible(true);
    setSelectedId(id);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/suggestion/${idSelected}`,
        {
          method: 'DELETE',
        },
      );
      console.log(response);
      router.push('/edition');
    } catch (error) {
      console.error('Erro ao deletar palavra', error);
    }
  }

  function editSuggestion(id: number) {
    router.push({
      pathname: '/(tab)/edition/personalize/addSinal',
      params: { id: `${id}` },
    });
  }

  return (
    <>
      <TextInput
        style={[styles.input]}
        placeholder="Filtrar as sugestões"
        value={filter}
        onChangeText={(text) => {
          setFilter(text);
        }}
        cursorColor={'black'}
        inputMode="text"
        placeholderTextColor="black"
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={false} progressViewOffset={70} />
        }
      >
        <View style={[isWeb ? styles.divSuggestionWeb : {}]}>
          {filteredItems?.map((suggestion, index) => (
            <View
              key={index}
              style={[isWeb ? styles.listContainerWeb : styles.listContainer]}
            >
              <View style={styles.divImage}>
                <ImageModal
                  style={styles.image}
                  source={{
                    uri: `data:image/jpeg;base64,${suggestion.wordDefinitions![0].src}`,
                  }}
                />
              </View>
              <View style={styles.divLabelAndOption}>
                <View style={styles.divButtonOptions}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.buttonOption,
                      {
                        backgroundColor: pressed ? '#3d9577' : '#ecf7f4',
                      },
                    ]}
                    onPress={() => {
                      deleteSuggestion(suggestion._id);
                    }}
                  >
                    <Entypo
                      style={{ alignSelf: 'center' }}
                      name="dots-three-vertical"
                      size={21}
                      color="black"
                    />
                  </Pressable>
                </View>
                <View style={styles.divLabelCategory}>
                  <Text style={styles.textCategory}>{suggestion.nameWord}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <BlurView
            tint={'systemChromeMaterialDark'}
            intensity={60}
            style={styles.modalOverlay}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButton,
                      pressed && styles.modalButtonOnPress,
                      {
                        paddingLeft: 3,
                      },
                    ]}
                    onPress={() => {
                      editSuggestion(idSelected);
                      closeModal();
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: 'center' }}
                      name="edit"
                      size={21}
                      color="black"
                    />
                    <Text style={styles.modalText}>Editar</Text>
                  </Pressable>
                </View>
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButton,
                      pressed && styles.modalButtonOnPress,
                    ]}
                    onPress={() => {
                      handleDelete(), closeModal();
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: 'center' }}
                      name="trash-can-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.modalText}>Lixeira</Text>
                  </Pressable>
                </View>

                <Separator
                  marginLeftProp={-40}
                  marginTopProp={7}
                  marginBottomProp={5}
                  widthProps={isWeb ? 280 : width * 0.7}
                />

                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButtonClose,
                      pressed && styles.modalButtonCloseOnPress,
                    ]}
                    onPress={closeModal}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.modalText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    paddingVertical: 0,
    marginTop: 13,
  },
  containerWeb: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 13,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 40,
    alignSelf: 'center',
    width: 350,
    paddingLeft: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3d9577',
    color: 'black',
    fontSize: 18,
  },
  divSuggestionWeb: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: 'white',
    marginBottom: 13,
    width: isWeb ? 500 : 385,
    height: isWeb ? 150 : 125,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#3d9577',
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra no Android
    elevation: 5,
  },
  listContainerWeb: {
    backgroundColor: 'white',
    marginBottom: 13,
    marginHorizontal: 15,
    width: 395,
    height: isWeb ? 120 : 125,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#3d9577',
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra no Android
    elevation: 5,
  },
  image: {
    width: isWeb ? 170 : 180,
    height: isWeb ? 110 : 105,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
  },
  divImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '50%',
  },
  textCategory: {
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#03459e',
  },
  divLabelAndOption: {
    height: 110,
    width: '48.5%',
  },
  divButtonOptions: {
    width: '100%',
    height: 25,
    alignItems: 'flex-end',
  },
  divLabelCategory: {
    height: 60,
    justifyContent: 'center',
    marginRight: 30,
  },
  buttonOption: {
    borderColor: '#3d9577',
    borderWidth: 1.5,
    width: 35,
    height: 35,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0s)',
  },
  modalContainer: {
    width: 350,
    paddingVertical: 15,
    flexDirection: 'column',
    backgroundColor: '#ecf7f4',
    marginBottom: 4,
    paddingLeft: 35,
    borderRadius: 10,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: '#3d9577',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 18,
    paddingLeft: 6,
  },
  modalButton: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    width: isWeb ? 280 : '90%',
  },
  modalButtonOnPress: {
    flexDirection: 'row',
    backgroundColor: '#8e8e8e8a',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    width: isWeb ? 280 : '90%',
  },
  modalButtonClose: {
    flexDirection: 'row',
    paddingLeft: 1,
    marginBottom: -12,
    borderRadius: 5,
    width: isWeb ? 280 : '90%',
    paddingVertical: 5,
  },
  modalButtonCloseOnPress: {
    flexDirection: 'row',
    backgroundColor: '#8e8e8e8a',
    paddingLeft: 1,
    marginBottom: -12,
    borderRadius: 5,
    width: isWeb ? 280 : '90%',
  },
  modalIconsAndButtons: {
    flexDirection: 'row',
    paddingVertical: 1,
    marginBottom: 5,
  },
});

export default SuggestionViewerEdition;
