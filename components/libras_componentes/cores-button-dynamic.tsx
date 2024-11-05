import { Text, StyleSheet, Pressable, Dimensions, View } from 'react-native';
import { Link } from 'expo-router';
import { ReactNode } from 'react';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 && height >= 1024;
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const CardsInMenu = ({
  router,
  label,
  imageBase64,
}: {
  router?: string;
  label: string;
  imageBase64: string | undefined;
}): React.ReactNode => {
  const isLongLabel = label.length > 15;
  return (
    <Pressable style={styles.div}>
      <View
        style={[
          styles.componentContainer,
          isLongLabel && { marginBottom: 0 }, // Adiciona marginBottom se label for longa
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${imageBase64}`,
          }}
          contentFit="cover"
          placeholder={{ blurhash }}
          transition={1000}
        />
      </View>
      <View style={styles.separator}></View>
      <Text style={[styles.label, isLongLabel && { marginTop: 9 }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
  label: {
    paddingVertical: 1,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 20,
    width: '90%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#03459F',
  },
  image: {
    width: isTablet ? '90%' : '90%',
    height: isTablet ? 220 : 112,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    width: 167,
    height: isTablet ? 300 : 175,
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#3E9677',
  },
  componentContainer: {
    width: '100%',
    height: '66%',
    alignItems: 'center',
    paddingTop: 5,
  },
  separator: {
    width: '90%',
    marginTop: 10,
    marginBottom: -11,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#cac9c99c',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
