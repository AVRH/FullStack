import React from 'react'
import ErrorMessage from './ErrorMessage'

const AddForm = ({message,addPerson, nameValue, handlePersonChange, numberValue, handleNumberChange}) => {
    return(
    <div className="addForm">
    <h2 className="sectionHeader">Lisaa Uusi</h2>
    {message != null ? <ErrorMessage message={message}/> : null}
    <form onSubmit={addPerson}>
        <div>
        nimi: <input 
            value={nameValue}
            onChange={handlePersonChange}
        />
        numero: <input
            value={numberValue}
            onChange={handleNumberChange}
        />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
    </div>
    )
}

export default AddForm