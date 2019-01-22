import React from 'react'

const Country = ({country}) => {
    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src= {country.flag} />
      </div>
    )
  }

  export default Country;