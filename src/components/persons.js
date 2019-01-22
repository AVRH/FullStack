import React from 'react'

const Persons = ({persons, handleDelete}) => {
    return(
        <div className="personList">
        <h2 className="sectionHeader">Numerot</h2>
        {persons.map(p => 
            <Person key={p.name} person={p} handleClick={handleDelete(p.name, p.id)}/>
        )}
        </div>
    )
}

const Person = ({person, handleClick}) => {
    return(
        <div className="person">
        <p>{person.name} {person.number} <button onClick={handleClick} id="delete">Delete</button></p> 
        
        </div>
    )
}

export default Persons