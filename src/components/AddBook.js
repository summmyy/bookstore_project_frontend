import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddBookScreen = () => {

  const navigate = useNavigation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null)


      const pick = () => {
          let result = ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
          });

          if (!result.cancelled) {
              setImage(result.uri);
          }
      }

      const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (!pickerResult.canceled) {
          setImage(pickerResult.uri);
        }
      };

  const handleSubmit = async () => {
    const bookData = {
      title: title,
      author: author,
      description: description,
      image: image
    };
  
    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });
  
      if (response.ok) {
        navigate.navigate('Home'); // Successful submission, navigate back to Home Screen
      } else {
        console.error('Failed to submit book data');
      }
    } catch (error) {
      console.error('Error submitting book data:', error);
    }
  };

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
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Author" value={author} onChangeText={setAuthor} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <Button title='Upload Thumbnail' onPress={handleImagePicker} color='green' mode='contained' />
      {/* <Button title='Remove Thumbnail' onPress={removeImage} color='green' mode='contained' /> */}
      <Button title="Submit" onPress={handleSubmit} />
      <Button title='Go home' onPress={() => navigate.navigate('Home')} />
    </View>
  );
};

export default AddBookScreen;
