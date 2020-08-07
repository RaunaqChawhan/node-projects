const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter((note) => note.title === title);
    //suppose we have 1000 notes, filter will loop through all the notes even if it has found a duplicate at position 1.
    //therefore using find method that will stop execution as soon as it finds the first match
    const duplicateNote = notes.find((note) => note.title === title);

    // if(duplicateNotes.length === 0) {
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
};

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    if(filteredNotes.length < notes.length) {
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
    
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteToDisplay = notes.find((note) => note.title === title);
    if(noteToDisplay) {
        console.log(chalk.bold.blue('Title: ' + noteToDisplay.title));
        console.log('Body: ' + noteToDisplay.body);
    } else {
        console.log(chalk.red('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes'));
    notes.forEach((note) => console.log(note.title));
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};