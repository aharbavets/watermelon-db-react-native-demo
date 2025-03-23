import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotesListScreen from './screens/NotesListScreen/NotesListScreen.tsx';
import CreateNoteScreen from './screens/CreateNoteScreen/CreateNoteScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  NotesList: {};
  CreateNote: {};
};

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NotesList">
        <Stack.Screen
          name="NotesList"
          component={NotesListScreen}
          options={{title: 'My Notes'}}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNoteScreen}
          options={{title: 'Create Note'}}
          initialParams={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
