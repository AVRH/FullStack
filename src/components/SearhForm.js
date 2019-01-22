import React from 'react'

const SearchForm = ({searchTerm, handleChange}) => {
    return(
        <div className="searchForm">
        Rajaa tuloksia: <input
        value={searchTerm}
        onChange={handleChange}
         />
        </div>
    )
}

export default SearchForm