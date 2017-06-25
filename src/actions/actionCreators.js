// favorite

export function favorite(index) {
  return {
    type: 'ADD_FAVORITE',
    index
  }
}

// add note

export function addNote(noteID, author, note) {
  return {
    type: 'ADD_NOTE',
    noteID,
    author,
    note,
  }
}

// remove note

export function removeNote(noteID, i) {
  return {
    type: 'REMOVE_NOTE',
    noteID,
    i
  }
}
