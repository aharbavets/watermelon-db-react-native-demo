import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import Note from '../../models/note.tsx';
import {Q} from '@nozbe/watermelondb';
import {
    FlatList,
    ListRenderItem,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './NoteListScreen.style.ts';
import {database} from '../../db/db.ts';
import {RootStackParamList} from '../../navigation.tsx';
import {Screens} from '../../navigation/MainNavigator.tsx';

export type NotesListScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'NotesList'
>;
export type NotesListScreenRouteProp = RouteProp<
    RootStackParamList,
    'NotesList'
>;

export const NotesListScreen: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const navigation = useNavigation<NotesListScreenNavigationProp>();

    useEffect(() => {
        // Subscribe to notes changes
        const notesCollection = database.collections.get<Note>('notes');

        const subscription = notesCollection
            .query(Q.sortBy('created_at', Q.desc))
            .observe()
            .subscribe(notesData => {
                setNotes(notesData);
            });

        return () => subscription.unsubscribe();
    }, []);

    const formatDate = (timestamp: Date | null | undefined): string => {
        if (!timestamp) return '';
        return timestamp.toLocaleString();
    };

    const renderItem: ListRenderItem<Note> = ({item}) => (
        <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>
                {item.content}
            </Text>
            <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {notes.length === 0 ? (
                <Text style={styles.emptyText}>
                    No notes yet. Create your first note!
                </Text>
            ) : (
                <FlatList<Note>
                    data={notes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate(Screens.CreateNote, {})}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default NotesListScreen;
