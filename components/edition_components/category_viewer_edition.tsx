import { View, Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TypeCategory } from '@/@types/Category';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { CreateButton } from '../createData/create-Button';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const CategoryViewerEdition = ({
  data,
}: {
  data: TypeCategory[] | undefined;
}) => {
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      {data?.map((category, index) => (
        <View style={styles.listContainer} key={index}>
          <View style={styles.divImage}>
            <Image
              style={styles.image}
              source={{
                uri: `data:image/jpeg;base64,${category.imgCategory}`,
              }}
              contentFit="cover"
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
              <Text style={styles.textCategory}>{category.nameCategory}</Text>
            </View>
          </View>
        </View>
      ))}
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
  listContainer: {
    backgroundColor: 'white',
    marginBottom: 13,
    width: width * 0.95,
    height: 125,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#3d9577',
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: '100%',
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
});

export default CategoryViewerEdition;
