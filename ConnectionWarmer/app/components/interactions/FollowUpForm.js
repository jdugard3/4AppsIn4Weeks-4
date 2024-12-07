import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOLLOW_UP_TYPES = [
  { id: 'call', label: 'Call', icon: 'call', color: '#4CAF50' },
  { id: 'meeting', label: 'Meeting', icon: 'people', color: '#2196F3' },
  { id: 'email', label: 'Email', icon: 'mail', color: '#FF9800' },
  { id: 'task', label: 'Task', icon: 'checkmark-circle', color: '#9C27B0' }
];

const PRIORITY_LEVELS = [
  { id: 'high', label: 'High', color: '#f44336' },
  { id: 'medium', label: 'Medium', color: '#ff9800' },
  { id: 'low', label: 'Low', color: '#4caf50' }
];

const FOLLOW_UP_PERIODS = [
  { id: 'tomorrow', label: 'Tomorrow', days: 1 },
  { id: '3d', label: '3 Days', days: 3 },
  { id: '1w', label: '1 Week', days: 7 },
  { id: '2w', label: '2 Weeks', days: 14 },
  { id: '1m', label: '1 Month', days: 30 }
];

const FollowUpForm = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState(FOLLOW_UP_TYPES[0]);
  const [selectedPriority, setPriority] = useState(PRIORITY_LEVELS[1]);
  const [selectedPeriod, setSelectedPeriod] = useState(FOLLOW_UP_PERIODS[1]);

  const handleSubmit = () => {
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + selectedPeriod.days);

    onSubmit({
      type: selectedType.id,
      priority: selectedPriority.id,
      date: followUpDate.toISOString(),
      period: selectedPeriod.days
    });
  };

  return (
    <View style={styles.container}>
      {/* Follow-up Type */}
      <Text style={styles.sectionTitle}>Follow-up Type</Text>
      <View style={styles.typeContainer}>
        {FOLLOW_UP_TYPES.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeButton,
              selectedType.id === type.id && styles.selectedButton,
              { borderColor: type.color }
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Ionicons name={type.icon} size={24} color={type.color} />
            <Text style={styles.typeLabel}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority */}
      <Text style={styles.sectionTitle}>Priority</Text>
      <View style={styles.priorityContainer}>
        {PRIORITY_LEVELS.map(priority => (
          <TouchableOpacity
            key={priority.id}
            style={[
              styles.priorityButton,
              selectedPriority.id === priority.id && { backgroundColor: priority.color }
            ]}
            onPress={() => setPriority(priority)}
          >
            <Text style={[
              styles.priorityLabel,
              selectedPriority.id === priority.id && styles.selectedPriorityLabel
            ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Follow-up Period */}
      <Text style={styles.sectionTitle}>When to Follow Up</Text>
      <View style={styles.periodContainer}>
        {FOLLOW_UP_PERIODS.map(period => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod.id === period.id && styles.selectedPeriodButton
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.periodLabel,
              selectedPeriod.id === period.id && styles.selectedPeriodLabel
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Set Follow-up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#2A2A2A',
    minWidth: '48%',
  },
  selectedButton: {
    backgroundColor: '#3A3A3A',
  },
  typeLabel: {
    color: '#FFFFFF',
    marginLeft: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    padding: 8,
    borderRadius: 8,
    minWidth: '30%',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
  priorityLabel: {
    color: '#FFFFFF',
  },
  selectedPriorityLabel: {
    color: '#000000',
    fontWeight: 'bold',
  },
  periodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  periodButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#007AFF',
  },
  periodLabel: {
    color: '#FFFFFF',
  },
  selectedPeriodLabel: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FollowUpForm;