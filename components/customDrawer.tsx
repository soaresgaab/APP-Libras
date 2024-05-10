import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Color from 'color';
import { Link, useTheme } from '@react-navigation/native';

export default function CustomDrawerContent(props: any) {
  const { colors } = useTheme();
  const erick = Color(colors.text).alpha(0.68).rgb().string();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem label={"teste"} onPress={()=>router.replace('/')}/>   */}
      </DrawerContentScrollView>

      <View style={{ paddingBottom: 5 + bottom }}>
        <View style={styles.borda}></View>
        <DrawerItem
          label={'Sair'}
          onPress={() => BackHandler.exitApp()}
          icon={() => (
            <Ionicons
              style={{ alignSelf: 'center', position: 'relative', left: 80 }}
              name="arrow-undo"
              size={20}
            ></Ionicons>
          )}
          labelStyle={{ alignSelf: 'center' }}
        ></DrawerItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  borda: {
    width: '80%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: '#cac9c99c',
  },
  text: {
    fontWeight: '700',
    color: '#1c1c1ead',
    marginLeft: 5,
  },
});
