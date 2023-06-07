import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom';
const Note = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, getNote, editNote } = context
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {

            getNote()
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [enote, setEnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const update = (cnote) => {
        ref1.current.click();
        setEnote({ id: cnote._id, etitle: cnote.title, edescription: cnote.description, etag: cnote.tag })
    }
    const handleOnChange = (e) => {
        setEnote({ ...enote, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e) => {
        e.preventDefault(e);
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag)
        ref2.current.click()

    }
    return (
        <>
            <button type="button" ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={enote.edescription} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={enote.etag} onChange={handleOnChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={ref2} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            {notes.length === 0 && <h6 className='mx-3'>No notes to display..</h6>}
            <div className="row justify-content-center">
                {
                    notes.map((note) => {
                        return <div key={note._id} className="col-md-3 mx-1 my-2">{<Noteitem note={note} update={update} />}</div>
                    })
                }
            </div>
        </>
    )
}

export default Note