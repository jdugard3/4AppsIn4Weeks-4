import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INTERACTION_TYPES = {
  call: { label: 'Call', icon: 'call', color: '#4CAF50' },
  meeting: { label: 'Meeting', icon: 'people', color: '#2196F3' },
  email: { label: 'Email', icon: 'mail', color: '#FF9800' },
  text: { label: 'Text', icon: 'chatbubble', color: '#9C27B0' },
  other: { label: 'Other', icon: 'ellipsis-horizontal', color: '#757575' },
};

const InteractionCard = ({ interaction, onCompleteFollowUp }) => {
  const interactionType = INTERACTION_TYPES[interaction.type];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Ionicons 
            name={interactionType?.icon} 
            size={20} 
            color={interactionType?.color} 
          />
          <Text style={[styles.type, { color: interactionType?.color }]}>
            {interactionType?.label}
          </Text>
        </View>
        <Text style={styles.date}>
          {new Date(interaction.date).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.notes}>{interaction.notes}</Text>

      {interaction.followUp && (
        <View style={styles.followUpContainer}>
          <Text style={[
            styles.followUpText,
            interaction.followUp.completed && styles.followUpCompleted
          ]}>
            Follow-up: {new Date(interaction.followUp.date).toLocaleDateString()}
          </Text>
          {!interaction.followUp.completed && (
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={() => onCompleteFollowUp(interaction.id)}
            >
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  date: {
    color: '#808080',
    fontSize: 14,
  },
  notes: {
    fontSize: 16,
    color: 'white',
  },
  followUpContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followUpText: {
    color: '#FFA500',
    fontSize: 14,
  },
  followUpCompleted: {
    color: '#4CAF50',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default InteractionCard;