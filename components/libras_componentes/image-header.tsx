import { Image, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export const RenderHeader = (): React.ReactNode => {
  // Aqui você pode construir sua lógica para renderizar o header
  return (
    <Image
      style={styles.tinyLogo}
      source={require('../../assets/Imagem_do_WhatsApp_de_2024-05-10_à_s__11.12.35_90c7285d-removebg-preview.png')}
    ></Image>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  tinyLogo: {
    width: isTablet ? 180 : 130,
    height: isTablet ? 130 : 80,
    marginTop: isTablet ? -75 : -15,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
