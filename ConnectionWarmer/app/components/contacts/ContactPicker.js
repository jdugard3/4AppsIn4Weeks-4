import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Button } from '../ui/Button';

const ContactPicker = ({ onSelectContact, onAddManual }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          // Sort contacts by name
          const sortedContacts = data.sort((a, b) => 
            a.name?.localeCompare(b.name || '')
          );
          setContacts(sortedContacts);
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading contacts...</Text>
      ) : (
        <>
          <Button 
            onPress={onAddManual}
            title="Add New Contact Manually"
            style={styles.addButton}
          />
          
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => onSelectContact({
                  id: item.id,
                  name: item.name,
                  phoneNumbers: item.phoneNumbers,
                  emails: item.emails,
                })}
              >
                <Text style={styles.contactName}>{item.name}</Text>
                {item.phoneNumbers?.[0] && (
                  <Text style={styles.contactDetail}>
                    {item.phoneNumbers[0].number}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 20,
  },
  addButton: {
    margin: 16,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contactDetail: {
    color: '#808080',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ContactPicker;