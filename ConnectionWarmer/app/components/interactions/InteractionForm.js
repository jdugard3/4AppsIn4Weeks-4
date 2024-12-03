import { View, TextInput, StyleSheet } from 'react-native';
import Button from '../ui/Button';

const InteractionForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What did you discuss?"
        multiline
        numberOfLines={4}
      />
      <Button 
        title="Save Interaction"
        onPress={onSubmit}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 8,
  },
});

export default InteractionForm;