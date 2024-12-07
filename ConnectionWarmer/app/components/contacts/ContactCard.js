import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

const ContactCard = ({ contact, onPress }) => {
  const lastInteractionText = contact.lastInteraction 
    ? formatDistanceToNow(new Date(contact.lastInteraction), { addSuffix: true })
    : 'No recent interactions';
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={onPress}
      >
        <View style={styles.avatar}>
          <Text style={styles.initials}>
            {contact.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.lastInteraction}>
            Last interaction: {lastInteractionText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  lastContact: {
    fontSize: 14,
    color: '#808080',
    marginTop: 4,
  },
});

export default ContactCard;