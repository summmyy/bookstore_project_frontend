import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { encode } from 'base-64';



const BookListScreen = ({ navigation }) => {
  const [booksData, setBooksData] = useState([]);

  const navigate = useNavigation();

  const username = 'admin'
  const password = 'password123'
  const authHeader = 'Basic ' + encode(`${username}:${password}`);


  useEffect(() => {
    console.log('Fetching books data...');
    fetch('http://localhost:8080/books', {
        method : 'GET',
        headers : {
            Authorization: authHeader,
        }
    })
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
      headers : {
        Authorization: authHeader,
    }
    })
      .then(response => {
        if (response.ok) {
          navigate.navigate('Home'); // Successful submission, navigate back to Home Screen
        }
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Book Details', { book: item })}>
      <View>
        {/* Render the book's title, author, and thumbnail */}
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
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