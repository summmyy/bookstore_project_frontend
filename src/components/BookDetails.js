import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;

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
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Description: {book.description}</Text>
      <Text>Image: {book.image}</Text>
      <Button title='Go home' onPress={() => navigate.navigate('Book List')} />
      <Button title='Add Books' onPress={() => navigate.navigate('Add Books')} />
    </View>
  );
};

export default BookDetailsScreen;
