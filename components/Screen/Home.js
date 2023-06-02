import { StatusBar, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Title from '../Title';
import Input from '../Input';
import Task from '../Task';
import { useTasks } from '../TaskProvider';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { tasks, addTask, deleteTask, toggleTask, updateTask } = useTasks();

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleSubmitTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    if (editTask) {
      updateTask(editTask.id, newTask);
      setEditTask(null);
    } else {
      addTask({
        text: newTask,
        date: selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : null,
      });
    }

    setNewTask('');
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setNewTask(task.text);
    setSelectedDate(task.date ? moment(task.date, 'YYYY-MM-DD').toDate() : null);
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Title title="To Do List ✔️" />
      <TouchableOpacity style={styles.datePickerButton} onPress={handleToggleDatePicker}>
        <Text style={styles.datePickerButtonText}>
          {selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : 'Select Date'}
        </Text>
      </TouchableOpacity>
      <Modal visible={showDatePicker} animationType="slide" transparent={true}>
        <View style={styles.datePickerContainer}>
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedDayColor="#FF6B6B"
            textStyle={{ color: '#000' }}
            todayTextStyle={{ color: '#000' }}
          />
          <TouchableOpacity style={styles.datePickerCloseButton} onPress={handleToggleDatePicker}>
            <Text style={styles.datePickerCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Input
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={handleSubmitTask}
        buttonTitle={editTask ? 'Update' : 'Add'}
      />
      <ScrollView style={styles.taskContainer}>
        {Object.values(tasks)
          .reverse()
          .filter((item) =>
            selectedDate ? moment(item.date, 'YYYY-MM-DD').isSame(selectedDate, 'day') : true
          )
          .map((item) => (
            <Task
              key={item.id}
              item={item}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              updateTask={updateTask}
              handleEditTask={handleEditTask}
              selectedDate={selectedDate}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  datePickerButton: {
    marginVertical: height * 0.02,
    padding: width * 0.04,
    backgroundColor: '#f1f3f5',
    borderRadius: width * 0.02,
  },
  datePickerButtonText: {
    fontSize: width * 0.04,
    color: '#333',
    textAlign: 'center',
  },
  datePickerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerCloseButton: {
    alignItems: 'center',
    padding: width * 0.04,
    backgroundColor: '#f1f3f5',
  },
  datePickerCloseButtonText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  taskContainer: {
    marginTop: height * 0.02,
    width: '100%',
  },
});
