import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
import { useNavigation, DrawerActions } from '@react-navigation/native';

export const RenderLeftHeader = ({
  color,
}: {
  color: string | undefined;
}): React.ReactNode => {
  const navigation = useNavigation();
  function openDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <Pressable style={styles.container} onPress={() => openDrawer()}>
      <MaterialCommunityIcons
        name="menu"
        size={isTablet ? 50 : 40}
        color={color}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    marginLeft: isTablet ? 15 : 10,
    marginTop: isTablet ? -20 : 6,
  },
  tinyLogo: {
    width: isTablet ? 180 : 130,
    height: isTablet ? 130 : 80,
    marginTop: isTablet ? -75 : 40,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
