import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { useTasks } from '../TaskProvider';
import Task from '../Task';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Schedule = () => {
  const { tasks, deleteTask, toggleTask, updateTask } = useTasks();
  const [items, setItems] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const newItems = {};
    Object.values(tasks).forEach((task) => {
      const date = task.date;
      if (!newItems[date]) {
        newItems[date] = [];
      }
      newItems[date].push({
        name: task.text,
        height: 50,
        completed: task.completed,
        id: task.id,
        date: task.date,
      });
    });
    setItems(newItems);
  }, [tasks]);

  const handlePress = (task) => {
    setSelectedTask(task);
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const handleUpdateTask = (id, newText) => {
    updateTask(id, newText);
    setSelectedTask(null);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{ marginRight: wp('2%'), marginTop: hp('2%') }}
        onPress={() => handlePress(item)}
      >
        <Card style={[styles.card, { width: screenWidth - wp('4%') - insets.left - insets.right }]}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {selectedTask && selectedTask.id === item.id ? (
                <Task
                  item={{
                    id: item.id,
                    text: item.name,
                    completed: item.completed,
                    date: item.date,
                  }}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  updateTask={handleUpdateTask}
                  selectedDate={moment(selectedDate, 'YYYY-MM-DD')}
                />
              ) : (
                <Text style={styles.text}>{item.name}</Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: hp('2%') }}>
        <Text style={styles.text}>No tasks</Text>
      </View>
    );
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={handleDayPress}
        theme={{
          agendaDayTextColor: 'blue',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'yellow',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  text: {
    color: '#333',
    fontSize: wp('4%'),
  },
  card: {
    backgroundColor: '#FFF',
    marginBottom: hp('1%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: wp('1%'),
    shadowOffset: {
      height: hp('1%'),
      width: wp('1%'),
    },
  },
});

export default Schedule;
