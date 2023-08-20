import React from 'react'; // Import React
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ScreenText() {
  const navigate = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    font: {
      color: 'green',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.font}>Welcome To The Bookstore!</Text>
      {/* Use navigate.navigate instead of navigation.navigate */}
      <Button title="See Books" onPress={() => navigate.navigate('Book List')} />
      <StatusBar style="auto" />
    </View>
  );
}

export default ScreenText;