import React from 'react'
import Addnote from './Addnote'
import Note from './Note'

const Home = () => {
    return (
        <>
            <div className="container">
                <Addnote />
            </div>
            <div className="container">
                <Note />
            </div>
        </>
    )
}

export default Home