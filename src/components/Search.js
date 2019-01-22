import React from 'react'

const Search = ({countries, handleCountryClick}) => {
    if(countries.length > 10){
      return( 
        <p>Too many results, specify another filter</p>
      )}else {
        return(
          countries.map(country => <CountryName key={country.alpha2Code} countryName={country.name} handleClick={handleCountryClick(country.name)} />)
        )
      }
  } 

const CountryName = ({countryName,handleClick}) => {
    return(
        <p onClick={handleClick}> {countryName}</p>
    )
}
export default Search;