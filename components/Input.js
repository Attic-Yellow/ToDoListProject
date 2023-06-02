import { Dimensions, StyleSheet, TextInput } from 'react-native';

const Input = ({ value, onChangeText, onSubmitEditing }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="+ Add a task"
      maxLength={50}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('window').width - 15,
    fontSize: 20,
    backgroundColor: '#f1f3f5',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 8,
    alignItems: 'center',
  },
});

export default Input;