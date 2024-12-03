import { View, Text, ScrollView, StyleSheet } from 'react-native';

const UpcomingReminders = ({ reminders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Reminders</Text>
      <ScrollView style={styles.list}>
        {reminders?.map((reminder, index) => (
          <View key={index} style={styles.reminderCard}>
            <Text style={styles.contactName}>{reminder.contactName}</Text>
            <Text style={styles.dueDate}>Due: {reminder.dueDate}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    maxHeight: 200,
  },
  reminderCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  dueDate: {
    color: '#666',
    marginTop: 4,
  },
});

export default UpcomingReminders;