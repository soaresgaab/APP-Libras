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
    height: 95,
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

export const Libras_saudacoes_container = ({}): React.ReactNode => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/boa_noite.png')}
            ></Image>
          }
          <Text style={styles.label}>Boa noite</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/boa_tarde.png')}
            ></Image>
          }
          <Text style={styles.label}>Boa tarde</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/bom_dia.png')}
            ></Image>
          }
          <Text style={styles.label}>Bom dia</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/obrigado.png')}
            ></Image>
          }
          <Text style={styles.label}>Obrigado</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/por_favor.png')}
            ></Image>
          }
          <Text style={styles.label}>Por favor</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/tchau.png')}
            ></Image>
          }
          <Text style={styles.label}>Tchau</Text>
        </Pressable>
      </View>

      <View style={styles.container}></View>
    </>
  );
};
