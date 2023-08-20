import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';


const BookListScreen = ({ navigation }) => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    console.log('Fetching books data...');
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(data => {
        console.log('Books data received:', data);
        setBooksData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteBook = (bookId) => {
    // Delete book from the backend and update state
    fetch(`http://localhost:8080/books/${bookId}`, {
      method: 'DELETE',
      // Include authentication headers if needed
    })
      .then(response => {
        if (response.ok) {
          dispatch({ type: 'DELETE_BOOK', payload: bookId });
        }
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Book Details', { book: item })}>
      <View>
        {/* Render the book's title, author, and thumbnail */}
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
        <Button title="Delete" onPress={() => handleDeleteBook(item.id)} />
      </View>
    </TouchableOpacity>
  );

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
      <FlatList
        data={booksData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

        <Button title='Add Books' onPress={() => navigation.navigate('Add Books')} />
    </View>

  );
};

export default BookListScreen;