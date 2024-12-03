import { View, StyleSheet } from 'react-native';
import { InteractionForm } from './components/interactions';
import { useLocalSearchParams } from 'expo-router';

export default function Interactions() {
  const { contactId } = useLocalSearchParams();

  const handleSubmit = (interaction) => {
    console.log('New interaction:', interaction, 'for contact:', contactId);
  };

  return (
    <View style={styles.container}>
      <InteractionForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});