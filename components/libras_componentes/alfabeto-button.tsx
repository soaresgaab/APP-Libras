import { Link } from 'expo-router';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export const AlfabetoButton = (): React.ReactNode => {
  return (
    <Link href="/(alfabeto)" asChild>
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
    width: isTablet ? '100%' : '100%',
    height: isTablet ? 300 : 185,
    borderRadius: 12,
    alignSelf: 'center',
  },
  div: {
    width: '70%',
    height: isTablet ? 300 : 185,
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
