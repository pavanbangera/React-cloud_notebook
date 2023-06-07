import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";

const NoteState = (props) => {
    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext;
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial)
    const getNote = async () => {
        const response = await fetch(`${process.env.REACT_APP_PORT}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            // body: JSON.stringify(data),
        });
        const json = await response.json()
        setNotes(json.notes)

    }

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${process.env.REACT_APP_PORT}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json()
        setNotes(notes.concat(json))
        showAlert("Added Successfuly", "success")
    }

    const deleteNote = async (id) => {
        await fetch(`${process.env.REACT_APP_PORT}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            // body: JSON.stringify(data),
        });
        showAlert("Deleted Successfuly", "success")
        setNotes(notes.filter((n) => { return n._id !== id }))
    }
    const editNote = async (id, title, description, tag) => {
        await fetch(`${process.env.REACT_APP_PORT}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag }),

        });

        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        showAlert("Updated Successfuly", "success")
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNote, editNote }}>
            {props.children}
        </NoteContext.Provider >
    )
}
export default NoteState;