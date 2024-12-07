import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button = ({ title, onPress, style, textStyle, variant = 'primary', icon }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'back' && styles.backButton,
        style
      ]} 
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[
          styles.text, 
          variant === 'back' && styles.backText,
          textStyle
        ]}>
          {variant === 'back' ? '← ' : ''}{title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backText: {
    color: '#007AFF',
  },
});

export default Button;