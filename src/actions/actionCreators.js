// toggle favorite

export function toggleFavorite(index) {
  return {
    type: 'TOGGLE_FAVORITE',
    index
  }
}

// add note

export function addNote(note, i) {
  return {
    type: 'ADD_NOTE',
    note,
    i,
  }
}

// remove note

export function removeNote(i) {
  return {
    type: 'REMOVE_NOTE',
    i
  }
}
