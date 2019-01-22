import React from 'react'

const Kurssi = ({kurssi}) => {
    return(
        <div id="kurssi">
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}
const Otsikko = ({nimi}) => {
    return(
        <div>
            <h2>{nimi}</h2>
        </div>
    )
}

const Sisalto = ({osat}) => {
    return(
        <div>
            {osat.map(osa => 
            <Osa key={osa.id} osa={osa} />
            )}
        </div>
    )
}

const Osa = ({osa}) => {
    return(
        <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
    )
}

const Yhteensa = ({osat}) => {
    const tehtavia = osat.map(osa => osa.tehtavia).reduce((a,b) => a+b,0)
    
    return(
        <div>
            <p>yhteensä {tehtavia} tehtävää</p>
        </div>
    )
}

export default Kurssi 