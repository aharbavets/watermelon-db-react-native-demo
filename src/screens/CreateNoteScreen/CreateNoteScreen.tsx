import React, {useState} from 'react';
import {
  useNavigation,
} from '@react-navigation/native';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Note from '../../models/note.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './CreateNoteScreen.style.ts';
import {RootStackParamList} from '../../navigation.tsx';
import {database} from '../../db/db.ts';



export type CreateNoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateNote'>;


export const CreateNoteScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigation = useNavigation<CreateNoteScreenNavigationProp>();

  const saveNote = async (): Promise<void> => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    try {
      await database.write(async () => {
        const notesCollection = database.collections.get<Note>('notes');
        await notesCollection.create((note: Note) => {
          note.title = title;
          note.content = content;
          note.createdAt = new Date();
        });
      });

      navigation.goBack();
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert('Error', 'Failed to save note. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Write your note here..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CreateNoteScreen;
