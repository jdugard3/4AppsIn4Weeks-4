import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet } from 'react-native';
import  Button  from '../ui/Button';

const AddContactModal = ({ visible, onClose, onSave }) => {
  const [newContact, setNewContact] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleSave = () => {
    if (newContact.name.trim()) {
      onSave(newContact);
      setNewContact({ name: '', phoneNumber: '', email: '' });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#666"
            value={newContact.name}
            onChangeText={(text) => setNewContact({ ...newContact, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#666"
            value={newContact.phoneNumber}
            onChangeText={(text) => setNewContact({ ...newContact, phoneNumber: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={newContact.email}
            onChangeText={(text) => setNewContact({ ...newContact, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              onPress={handleSave}
              style={styles.button}
            />
            <Button
              title="Cancel"
              onPress={onClose}
              style={styles.button}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
});

export default AddContactModal;