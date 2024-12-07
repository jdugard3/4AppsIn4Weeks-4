import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Button } from './components/ui';
import { Ionicons } from '@expo/vector-icons';
import { requestNotificationPermissions, scheduleFollowUpNotification, cancelNotification } from './utils/notifications';
import InteractionCard from './components/interactions/InteractionCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  inputContainer: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  typeSelectorText: {
    color: 'white',
    marginLeft: 8,
    marginRight: 'auto',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  followUpContainer: {
    marginTop: 16,
  },
  followUpLabel: {
    color: 'white',
    marginBottom: 8,
  },
  followUpButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followUpOption: {
    backgroundColor: '#2A2A2A',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  followUpOptionSelected: {
    backgroundColor: '#007AFF',
  },
  followUpOptionText: {
    color: 'white',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalOptionText: {
    color: 'white',
    marginLeft: 8,
  },
  modalCancelButton: {
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 'auto',
  },
});

const INTERACTION_TYPES = [
  { id: 'call', label: 'Call', icon: 'call', color: '#4CAF50' },
  { id: 'meeting', label: 'Meeting', icon: 'people', color: '#2196F3' },
  { id: 'email', label: 'Email', icon: 'mail', color: '#FF9800' },
  { id: 'text', label: 'Text', icon: 'chatbubble', color: '#9C27B0' },
  { id: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: '#757575' },
];

export default function InteractionsScreen() {
  const { contactId, contactName } = useLocalSearchParams();
  const [newNote, setNewNote] = useState('');
  const [selectedType, setSelectedType] = useState(INTERACTION_TYPES[0]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(null);

  const addInteraction = async () => {
    if (newNote.trim()) {
      try {
        let notificationId = null;
        if (followUpDate) {
          const hasPermission = await requestNotificationPermissions();
          if (hasPermission) {
            const followUpData = {
              type: selectedType.id,
              date: followUpDate,
              priority: 'medium',
            };
            notificationId = await scheduleFollowUpNotification(
              { id: contactId, name: 'Contact' },
              followUpData
            );
          }
        }

        const newInteraction = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          type: selectedType.id,
          notes: newNote.trim(),
          followUp: followUpDate ? {
            date: followUpDate,
            completed: false,
            notificationId
          } : null
        };

        setInteractions([newInteraction, ...interactions]);
        setNewNote('');
        setFollowUpDate(null);
      } catch (error) {
        console.error('Error adding interaction:', error);
      }
    }
  };

  const completeFollowUp = async (interactionId) => {
    setInteractions(interactions.map(interaction => {
      if (interaction.id === interactionId) {
        if (interaction.followUp?.notificationId) {
          cancelNotification(interaction.followUp.notificationId);
        }
        return {
          ...interaction,
          followUp: {
            ...interaction.followUp,
            completed: true,
            completedAt: new Date().toISOString()
          }
        };
      }
      return interaction;
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button 
          variant="back"
          title={contactName || "Back"}
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.typeSelector}
          onPress={() => setShowTypeModal(true)}
        >
          <Ionicons 
            name={selectedType.icon} 
            size={20} 
            color={selectedType.color} 
          />
          <Text style={styles.typeSelectorText}>{selectedType.label}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Add a new interaction note..."
          placeholderTextColor="#666"
          value={newNote}
          onChangeText={setNewNote}
          multiline
        />

        <View style={styles.followUpContainer}>
          <Text style={styles.followUpLabel}>Set Follow-up:</Text>
          <View style={styles.followUpButtons}>
            <TouchableOpacity
              style={[
                styles.followUpOption,
                followUpDate && new Date(followUpDate).getDate() === new Date().getDate() + 1 && 
                styles.followUpOptionSelected
              ]}
              onPress={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setFollowUpDate(tomorrow.toISOString());
              }}
            >
              <Text style={styles.followUpOptionText}>Tomorrow</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.followUpOption,
                followUpDate && new Date(followUpDate).getDate() === new Date().getDate() + 7 && 
                styles.followUpOptionSelected
              ]}
              onPress={() => {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                setFollowUpDate(nextWeek.toISOString());
              }}
            >
              <Text style={styles.followUpOptionText}>Next Week</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.followUpOption,
                followUpDate && new Date(followUpDate).getDate() === new Date().getDate() + 30 && 
                styles.followUpOptionSelected
              ]}
              onPress={() => {
                const nextMonth = new Date();
                nextMonth.setDate(nextMonth.getDate() + 30);
                setFollowUpDate(nextMonth.toISOString());
              }}
            >
              <Text style={styles.followUpOptionText}>Next Month</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button 
          title="Add Interaction"
          onPress={addInteraction}
          style={styles.addButton}
        />
      </View>

      <Text style={styles.sectionTitle}>Interaction History</Text>
      <FlatList
        data={interactions}
        renderItem={({ item }) => (
          <InteractionCard 
            interaction={item}
            onCompleteFollowUp={completeFollowUp}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={showTypeModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Interaction Type</Text>
            {INTERACTION_TYPES.map(type => (
              <TouchableOpacity
                key={type.id}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedType(type);
                  setShowTypeModal(false);
                }}
              >
                <Ionicons name={type.icon} size={24} color={type.color} />
                <Text style={styles.modalOptionText}>{type.label}</Text>
              </TouchableOpacity>
            ))}
            <Button 
              title="Cancel" 
              onPress={() => setShowTypeModal(false)}
              style={styles.modalCancelButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}