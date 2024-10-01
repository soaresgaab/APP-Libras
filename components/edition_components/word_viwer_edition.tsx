import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { TypeLibrasData, TypeLibrasDataWithId } from '@/@types/LibrasData';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

const WordViewerEdition = ({
  data,
}: {
  data: TypeLibrasDataWithId[] | undefined;
}) => {
  return (
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
    // backgroundColor: 'red',
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
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra no Android
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
});

export default WordViewerEdition;
