import React from 'react'

const SearchForm = ({searchTerm, handleSearchChange}) => {
    return(
        <div>
        <h2>Rajaa naytettavia</h2>
        <form>
            rajaa: <input
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </form>
        </div>
    )
}

export default SearchForm