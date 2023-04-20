import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../Firebase';

const SettingsScreen = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [uid, setUid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
