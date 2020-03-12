import React,{ useState,useEffect,useReducer } from 'react';
import AddNoteForm from './components/addNoteForm';
import './App.css';

const notesReducer = (state,action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [
        ...state,
        { title: action.title,body: action.body }
      ]
    case "REMOVE_NOTE":
      return state.filter((note) => note.title !== action.title)
    default:
      return state;
  }
};

const App = () => {
  const [notes,dispatch] = useReducer(notesReducer,[]);

  // useEffect(() => {
  //   localStorage.setItem('notes',JSON.stringify(notes));
  // },[notes]);

  // const removeNote = ((title) => {
  //   setNotes(notes.filter((note) => note.title !== title));
  // });

  const removeNote = ((title) => {
    dispatch(
      {
        type: 'REMOVE_NOTE',
        title
      }
    )
  });

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
      // setNotes(notesData)
      dispatch({
        type: "POPULATE_NOTES",
        notes
      })
    }
  },[]);//dependencies i.e the []

  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify(notes))
  },[notes]);//dependencies i.e the [notes]

  return (
    <div>
      <h1>Notes</h1>
      { notes.map((note) => {
        return (
          <div key={ note.title }>
            <h3>{ note.title }</h3>
            <p>{ note.body }</p>
            <button onClick={ () => removeNote(note.title) }>x</button>
          </div>
        )
      }) }
      <AddNoteForm dispatch={ dispatch } />
    </div >
  );
};

export default App;
