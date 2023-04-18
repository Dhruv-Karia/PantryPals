import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {


  return (
    <View>
      {currentUser && (
        <View>
          <Text>Hello {currentUser.displayName}!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

