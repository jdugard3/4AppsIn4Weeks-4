import { View, FlatList, StyleSheet } from 'react-native';
import { ContactCard } from './components/contacts';
import { useRouter } from 'expo-router';

export default function Contacts() {
  const router = useRouter();
  const mockContacts = [
    { id: '1', name: 'John Doe', lastContact: '2024-01-15' },
    { id: '2', name: 'Jane Smith', lastContact: '2024-01-20' },
  ];

  const handleContactPress = (contact) => {
    router.push({
      pathname: '/interactions',
      params: { contactId: contact.id }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockContacts}
        renderItem={({ item }) => (
          <ContactCard 
            contact={item}
            onPress={() => handleContactPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});