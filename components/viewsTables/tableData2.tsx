import { FlatList, SafeAreaView, View, Text, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function Item(props: any) {
  return (
    <View style={styles.item}>
      <View style={styles.item2}>
        <Text style={styles.title1}>
          {props.title !== null ? props.title : 'Não informado'}
        </Text>
      </View>
      <Text style={styles.div}>|</Text>
      <View style={styles.item2}>
        <Text style={styles.title2}>{props.other}</Text>
      </View>
      <Text style={styles.div}>|</Text>
      <View style={styles.item2}>
        <Text style={styles.title1}>{props.other2}</Text>
      </View>
    </View>
  );
}

export function TableData({ data }: any) {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.flatList, { marginBottom: tabBarHeight }]}>
      {data &&
        data.map((item: any, index: any) => (
          <Item
            style={styles.flatList}
            key={index}
            title={item[Object.keys(item)[0]]}
            other={item[Object.keys(item)[1]]}
            other2={item[Object.keys(item)[2]]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (StatusBar.currentHeight || 0) + 500,
  },
  flatList: {
    marginTop: (StatusBar.currentHeight || 0) + 20,
    marginHorizontal: '3%',
  },
  item: {
    backgroundColor: 'rgb(205 205 215)',
    padding: 5,
    marginVertical: '3%',
    marginHorizontal: '5%',
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 22,
    alignItems: 'center',
  },
  item2: {
    alignItems: 'center',
    width: '34%',
    justifyContent: 'center',
  },
  title1: {
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',

    alignItems: 'center',
  },
  title2: {
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  div: {
    width: '1.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});
