import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from '../Firebase';

const SettingsScreen = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [uid, setUid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notificationPermission, setNotificationPermission] = useState('');

  useEffect(() => {
    setDisplayName(firebase.auth().currentUser.displayName);
    setUid(firebase.auth().currentUser.uid);
  }, []);

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      props.navigation.navigate('Login');
    }).catch(error => {
      setErrorMessage(error.message);
    });
  };

  const handleNotificationPermission = () => {
    if (notificationPermission !== 'granted') {
      alert('Please grant notification permission first.');
      return;
    }

    scheduleNotification();
  };

  useEffect(() => {
    getNotificationPermission();
  }, []);

  const getNotificationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setNotificationPermission(status);
  };

  const scheduleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Checkup',
        body: 'Don\'t forget to check out our new products!',
        sound: true,
      },
      trigger: {
        seconds: 604800, // 1 week in seconds
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Hello, {displayName}
      </Text>
      <Button
        color="#3740FE"
        title="Logout"
        onPress={() => signOut()}
      />
      <View>
        <Text>Notification Permission Status: {notificationPermission}</Text>
        <Button title="Schedule Notification" onPress={handleNotificationPermission} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});

export default SettingsScreen;
