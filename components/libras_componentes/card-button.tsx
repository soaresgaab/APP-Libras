import {
  Image,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { ReactNode } from 'react';
import { SVGSinaisImageByCategory } from '@/components/libras_componentes/image-component-homeByCategory';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 && height >= 1024;

export const CardButton = ({
  label,
  img,
}: {
  label: string;
  img: string;
}): React.ReactNode => {
  const isLongLabel = label.length > 15;
  return (
    <Link href={`/sinaisByCard?label=${encodeURIComponent(label)}`} asChild>
      <Pressable style={styles.div}>
        {/*<Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${img}`,
          }}
        ></Image>*/}
        <View
          style={[
            styles.componentContainer,
            isLongLabel && { marginBottom: 0 }, // Adiciona marginBottom se label for longa
          ]}
        >
          {
            <SVGSinaisImageByCategory
              imageSource={img}
            ></SVGSinaisImageByCategory>
          }
        </View>
        <View style={styles.separator}></View>
        <Text style={[styles.label, isLongLabel && { marginTop: 9 }]}>
          {label}
        </Text>
      </Pressable>
    </Link>
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
    width: isTablet ? '80%' : '70%',
    height: isTablet ? 220 : 90,
    alignSelf: 'center',
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
