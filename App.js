import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenText from './src/components/Text';
import BookListScreen from './src/components/BookList';
import BookDetailsScreen from './src/components/BookDetails';
import AddBookScreen from './src/components/AddBook';
import { BookProvider } from './src/components/BookContext';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ScreenText} />
      <Stack.Screen name="Book List" component={BookListScreen}/>
      <Stack.Screen name="Book Details" component={BookDetailsScreen}/>
      <Stack.Screen name="Add Books" component={AddBookScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BookProvider>
        <AppNavigator />
      </BookProvider>
    </NavigationContainer>
  );
}


