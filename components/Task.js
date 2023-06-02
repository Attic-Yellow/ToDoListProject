import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import IconButton from './IconButton';
import { images } from './images';

const Task = ({ item, deleteTask, toggleTask, updateTask, selectedDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  useEffect(() => {
    setText(item.text);
  }, [item.text]);

  const handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (isEditing) {
      updateTask(item.id, text);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(item.text);
  };

  const handleChangeText = (value) => {
    setText(value);
  };

  const wrapText = (str) => {
    const maxChars = 15;
    if (str.length <= maxChars) {
      return str;
    }
    const firstLine = str.substring(0, maxChars);
    const remainingLines = wrapText(str.substring(maxChars));
    return `${firstLine}\n${remainingLines}`;
  };

  const wrappedText = wrapText(text);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.taskContent}>
          <IconButton
            type={item.completed ? images.completed : images.uncompleted}
            id={item.id}
            onPressOut={toggleTask}
          />
          {isEditing ? (
            <TextInput
              style={[styles.text, styles.input]}
              value={text}
              onChangeText={handleChangeText}
              onSubmitEditing={handleSave}
              onBlur={handleCancel}
              autoFocus
              multiline
              numberOfLines={2} // 최대 2줄까지 입력 가능
            />
          ) : (
            <Text style={[styles.text, item.completed && styles.completed]}>
              {wrappedText}
            </Text>
          )}
        </View>
        {!isEditing && !item.completed && (
          <View style={styles.taskButtons}>
            <IconButton
              type={images.edit}
              onPressOut={handleUpdateButtonPress}
            />
            <IconButton
              type={images.delete}
              id={item.id}
              onPressOut={deleteTask}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 15,
    marginLeft: 7,
    alignItems: 'center',
    marginBottom: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  text: {
    color: '#000',
    marginLeft: 10,
  },
  input: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButtons: {
    flexDirection: 'row',
    marginRight: 20,
  },
});

export default Task;
