import { View, Text, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

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
    </View>
  );
}

export function TableData({ data }: any) {
  return (
    <View style={styles.flatList}>
      {data &&
        data.map((item: any, index: any) => (
          <Item
            style={styles.flatList}
            key={index}
            title={item[Object.keys(item)[0]]}
            other={item[Object.keys(item)[1]]}
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
    marginHorizontal: '6%',
  },
  item: {
    backgroundColor: 'rgb(205 205 215)',
    padding: 5,
    marginVertical: '3%',
    marginHorizontal: '5%',
    borderRadius: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 22,
  },
  item2: {
    alignItems: 'center',
    width: '49%',
  },
  title1: {
    display: 'flex',
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title2: {
    display: 'flex',
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  div: {
    width: '1.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});
