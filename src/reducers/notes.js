function notes(state = [], action) {
  switch(action.type) {
    case 'TOGGLE_FAVORITE' :
      const i = action.index;
      return [
        ...state.slice(0, i),
        {...state[i], favorite: !state[i].favorite},
        ...state.slice(i + 1),
      ]
    case 'ADD_NOTE' :
      return [...state, {
        "note": action.note.note,
        "favorite": false,
        "id": action.note.i,
        "photo": action.note.photo
      }]
    case 'REMOVE_NOTE' :
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1),
      ]
    default :
      return state;
  }
}

export default notes;
