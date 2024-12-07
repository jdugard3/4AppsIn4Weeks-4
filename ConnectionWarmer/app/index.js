import { View, StyleSheet } from 'react-native';
import { Button } from './components/ui';
import { router } from 'expo-router';

export default function Home() {
  const handleViewContacts = () => {
    router.push('/contacts');
  };

  return (
    <View style={styles.container}>
      <Button 
        title="View Contacts"
        onPress={handleViewContacts}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  button: {
    width: '100%',
    maxWidth: 300
  }
});
