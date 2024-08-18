// src/utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const getNotes = async (): Promise<Note[]> => {
  try {
    // Récupérer la chaîne JSON stockée
    const notesString = await AsyncStorage.getItem('notes');
    
    // Si aucune note n'est stockée, retourner un tableau vide
    if (notesString === null) {
      return [];
    }

    // Parser la chaîne JSON en tableau d'objets
    const notes: Note[] = JSON.parse(notesString);

    // Trier les notes par date (la plus récente en premier)
    notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return notes;
  } catch (error) {
    // Gérer les erreurs potentielles
    console.error('Erreur lors de la récupération des notes:', error);
    
    // En cas d'erreur, on retourne un tableau vide pour éviter de casser l'application
    return [];
  }
};

// Fonction complémentaire pour sauvegarder une nouvelle note
export const saveNote = async (note: Omit<Note, 'id'>): Promise<void> => {
  try {
    // Récupérer les notes existantes
    const existingNotes = await getNotes();

    // Créer une nouvelle note avec un ID unique
    const newNote: Note = {
      id: Date.now().toString(), // Utiliser le timestamp comme ID unique
      ...note
    };

    // Ajouter la nouvelle note au tableau existant
    const updatedNotes = [newNote, ...existingNotes];

    // Convertir le tableau mis à jour en chaîne JSON
    const updatedNotesString = JSON.stringify(updatedNotes);

    // Sauvegarder la chaîne JSON mise à jour dans AsyncStorage
    await AsyncStorage.setItem('notes', updatedNotesString);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la note:', error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
};