import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNotes, Note } from '@/utils/storage';
import { SearchBar } from '@rneui/base';

export default function index() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await getNotes()
      setNotes(fetchedNotes)
    };
    loadNotes();
  }, [])

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar
        placeholder="Rechercher..."
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </>
  )
}