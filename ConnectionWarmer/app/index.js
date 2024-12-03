import { View, ScrollView, StyleSheet } from 'react-native';
import { UpcomingReminders } from './components/dashboard';
import { Button } from './components/ui';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const reminders = [
    { contactName: 'John Doe', dueDate: '2024-02-01' },
    { contactName: 'Jane Smith', dueDate: '2024-02-03' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Button 
        title="Add New Contact" 
        onPress={() => router.push('/contacts')}
        style={styles.button}
      />
      <UpcomingReminders reminders={reminders} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  button: {
    margin: 16,
  },
});