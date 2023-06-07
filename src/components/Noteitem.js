import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, update } = props
    return (
        <div className="card" >
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title} </h5>
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }} ></i>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={() => { update(note) }}></i>
                </div>
                <p className="card-text">{note.description}</p>
                <button type="button" className="btn btn-primary" disabled>{note.tag}</button>
            </div>

        </div>
    )
}

export default Noteitem