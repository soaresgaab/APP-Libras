import { Link } from 'expo-router';
import { Image, Text, StyleSheet, Button, Pressable } from 'react-native';

export const AlfabetoButton = (): React.ReactNode => {
  return (
    <Link href="/(menuPages)" asChild>
      <Pressable style={styles.div}>
        <Image
          style={styles.image}
          source={require('../../assets/ImagemButtonAlfabeto.jpg')}
        ></Image>
        <Text style={styles.label}>Alfabeto manual</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
  label: {
    marginTop: -70,
    paddingVertical: 8,
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
    width: '100%',
    height: 185,
    borderRadius: 12,
    // alignSelf: 'center',
  },
  div: {
    width: '70%',
    height: 185,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
