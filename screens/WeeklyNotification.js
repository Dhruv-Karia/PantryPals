import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function WeeklyNotification() {
  const [notificationPermission, setNotificationPermission] = useState('');

  useEffect(() => {
    getNotificationPermission();
  }, []);

  const getNotificationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setNotificationPermission(status);
  };

  const handlePress = () => {
    if (notificationPermission !== 'granted') {
      alert('Please grant notification permission first.');
      return;
    }

    scheduleNotification();
  };

  const scheduleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Checklist',
        body: 'Which recipes have you used this week?',
        sound: true,
      },
      trigger: {
        seconds: 604800, // 1 week in seconds
      },
    });
  };

  return (
    <View>
      <Text>Notification Permission Status: {notificationPermission}</Text>
      <Button title="Schedule Notification" onPress={handlePress} />
    </View>
  );
}
