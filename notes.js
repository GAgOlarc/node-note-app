const fs = require('fs');

const fetchNotes = () => {
    try {
        const noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body
    };

    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => fetchNotes();

const getNote = (title) => fetchNotes().filter(note => note.title === title)[0];

const removeNote = (title) => {
    const notes = fetchNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    saveNotes(updatedNotes);
    return notes.length !== updatedNotes.length;
};

const logNote = (note) => {
    console.log('--');
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};