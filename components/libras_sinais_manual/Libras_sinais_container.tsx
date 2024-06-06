import { Image, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { View } from '../Themed';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#F6F2DA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    paddingVertical: 6,
    marginTop: 10,
    alignSelf: 'center',
    // borderWidth: 2,
    // borderColor: '#e7503b',
    backgroundColor: '#e7d75d',
    borderRadius: 20,
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: '95%',
    height: 140,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    paddingTop: 25,
    width: '48%',
    height: 180,
    marginBottom: 15,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e7503b',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export const Libras_sinais_container = ({}): React.ReactNode => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amigo.png')}
            ></Image>
          }
          <Text style={styles.label}>Amigo</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amizade.png')}
            ></Image>
          }
          <Text style={styles.label}>Amizade</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amor.png')}
            ></Image>
          }
          <Text style={styles.label}>Amor</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/casa.png')}
            ></Image>
          }
          <Text style={styles.label}>Casa</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/importante.png')}
            ></Image>
          }
          <Text style={styles.label}>Importante</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/sinais/jesus.png')}
            ></Image>
          }
          <Text style={styles.label}>Jesus</Text>
        </Pressable>
      </View>

      <View style={styles.container}></View>
    </>
  );
};
