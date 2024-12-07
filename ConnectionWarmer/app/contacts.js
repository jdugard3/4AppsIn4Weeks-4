import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { ContactCard } from './components/contacts';
import { router } from 'expo-router';
import * as Contacts from 'expo-contacts';
import { Button } from './components/ui';
import { Ionicons } from '@expo/vector-icons';
import AddContactModal from './components/contacts/AddContactModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    margin: 16,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  addButton: {
    margin: 16,
    marginBottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      console.log('Permission status:', status);
      
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
          ],
        });
        console.log('Contacts loaded:', data.length);

        if (data.length > 0) {
          const formattedContacts = data.map(contact => ({
            id: contact.id,
            name: contact.name || 'No Name',
            phoneNumber: contact.phoneNumbers?.[0]?.number || '',
            email: contact.emails?.[0]?.email || '',
            lastContact: null
          }));

          formattedContacts.sort((a, b) => a.name.localeCompare(b.name));
          setContacts(formattedContacts);
        }
      } else {
        Alert.alert(
          "Permission Required",
          "This app needs access to your contacts to function properly.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert('Error', 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleContactPress = (contact) => {
    router.push({
      pathname: '/interactions',
      params: { 
        contactId: contact.id,
        contactName: contact.name
      }
    });
  };

  const handleAddContact = async (newContact) => {
    try {
      const contact = {
        [Contacts.Fields.FirstName]: newContact.name,
        [Contacts.Fields.PhoneNumbers]: [{
          label: 'mobile',
          number: newContact.phoneNumber,
        }],
        [Contacts.Fields.Emails]: [{
          label: 'work',
          email: newContact.email,
        }],
      };

      await Contacts.addContactAsync(contact);
      loadContacts(); // Reload contacts after adding
    } catch (error) {
      console.error('Error adding contact:', error);
      Alert.alert('Error', 'Failed to add contact');
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Button 
        title="Add New Contact"
        icon={<Ionicons name="add" size={24} color="white" />}
        onPress={() => setShowAddModal(true)}
        style={styles.addButton}
      />
      <TextInput 
        style={styles.searchInput}
        placeholder="Search contacts..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredContacts}
        renderItem={({ item }) => (
          <ContactCard 
            contact={item}
            onPress={() => handleContactPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <AddContactModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddContact}
      />
    </View>
  );
}

