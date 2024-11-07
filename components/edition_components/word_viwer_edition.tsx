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
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import Separator from '../libras_componentes/separator';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

const WordViewerEdition = ({
  data,
}: {
  data: TypeLibrasDataWithId[] | undefined;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [idSelected, setSelectedId] = useState(0);

  const [filter, setFilter] = useState<string>('');
  const filteredItems = (data || []).filter((item) =>
    item.nameWord!.toLowerCase().includes(filter.toLowerCase()),
  );

  function deleteWord(id: number) {
    console.log(idSelected);
    setModalVisible(true);
    setSelectedId(id);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function routePush(id: number) {
    router.push({
      pathname: '/(editionwords)/[words]',
      params: { id: `${id}` },
    });
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/word/${idSelected}`,
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

  function editWord(id: number) {
    router.push({
      pathname: '/(tab)/edition/personalize/[word]',
      params: { id: `${id}` },
    });
  }

  return (
    <>
      <TextInput
        style={[styles.input]}
        placeholder="Filtrar as palavras"
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
        <View style={[isWeb ? styles.divWordWeb : {}]}>
          {data?.map((word, index) => (
            <View style={styles.listContainer} key={index}>
              <View style={styles.divLabelAndOption}>
                <View style={styles.divLabelCategory}>
                  <Text style={styles.textCategory}>{word.nameWord}</Text>
                </View>
                <View style={styles.divButtonOptions}>
                  <Pressable
                    onPress={() => {
                      deleteWord(word._id!);
                    }}
                    style={({ pressed }) => [
                      styles.buttonOption,
                      {
                        backgroundColor: pressed ? '#3d9577' : '#ecf7f4',
                      },
                    ]}
                  >
                    <Entypo
                      style={{ alignSelf: 'center' }}
                      name="dots-three-vertical"
                      size={21}
                      color="black"
                    />
                  </Pressable>
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
                      editWord(idSelected);
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
                      size={23}
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
                      size={23}
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
  divWordWeb: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '77%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    marginTop: 5,
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
  listContainer: {
    backgroundColor: 'white',
    marginBottom: isWeb ? 17 : 10,
    marginHorizontal: 10,
    width: isWeb ? 330 : width * 0.95,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#3d9577',
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
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
    width: '98.5%',
    flexDirection: 'row',
  },
  divButtonOptions: {
    width: '30%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  divLabelCategory: {
    width: '68%',
    justifyContent: 'center',
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

export default WordViewerEdition;
