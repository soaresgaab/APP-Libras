import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export const CardTutorial = ({
  router,
  label,
}: {
  router: string;
  label: string;
}): React.ReactNode => {
  return (
    <Link href={`/${router}`} asChild>
      <Pressable style={styles.div}>
        <Image
          style={styles.image}
          source={require('../../assets/ImagemTutorial.jpg')}
        ></Image>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
  label: {
    paddingVertical: 6,
    marginTop: 10,
    alignSelf: 'center',
    // borderWidth: 2,
    // borderColor: '#e7503b',
    borderRadius: 20,
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: isTablet ? '80%' : '70%',
    height: isTablet ? 220 : 90,
    alignSelf: 'center',
  },
  div: {
    width: '70%',
    height: isTablet ? 300 : 185,
    marginTop: 40,
    marginBottom: 30,
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
