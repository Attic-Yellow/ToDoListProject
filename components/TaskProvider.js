// TaskProvider.js
import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});

  const addTask = (newTask) => {
    const ID = Date.now().toString();
    const newTaskObject = {
      id: ID,
      text: newTask.text,
      completed: false,
      date: newTask.date,
    };
    setTasks({ ...tasks, [ID]: newTaskObject });
  };

  const deleteTask = (id) => {
    const currentTasks = { ...tasks };
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const toggleTask = (id) => {
    const currentTasks = { ...tasks };
    currentTasks[id].completed = !currentTasks[id].completed;
    setTasks(currentTasks);
  };

  const updateTask = (id, newText) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[id]) {
        updatedTasks[id] = { ...updatedTasks[id], text: newText };
      }
      return updatedTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
