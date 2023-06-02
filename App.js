import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import HomeScreen from './components/Screen/Home';
import CalendarScreen from './components/Screen/Calendar';
import { TaskProvider } from './components/TaskProvider';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === '할 일 목록') {
                iconName = 'list';
              } else if (route.name === '달력') {
                iconName = 'calendar';
              }
              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#1DA1F2',
            inactiveTintColor: '#555',
            style: {
              backgroundColor: '#fff',
            },
            labelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen name="할 일 목록" component={HomeStackScreen} />
          <Tab.Screen name="달력" component={CalendarScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default AppNavigator;
