import { Image, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';

export const CreateButton = ({
  router,
  label,
}: {
  router: string;
  label: string;
}): React.ReactNode => {
  return (
    <Link href={`/${router}`} asChild>
      <Pressable style={styles.div}>
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
    marginTop: -30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e7503b',
    backgroundColor: '',
    borderRadius: 20,
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: '70%',
    height: 90,
    alignSelf: 'center',
  },
  div: {
    marginTop: 18,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
