import React from 'react'
import Country from './Country'

const Display = ({ countries, filter, weather, showCountry, handleCountryChange }) => {

    const countriesFiltered = countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase()))

    if (countriesFiltered[0] === undefined) {
        return (
            <p>Write a name of a country</p>
        )
    } else if (countriesFiltered.length === 1) {
        //Set the capital to get right weather
        handleCountryChange(countriesFiltered[0].capital)
        return (
            <div key={countriesFiltered[0].name}>
                <Country country={countriesFiltered[0]} weather={weather}/>
            </div>
        )
    } else if (countriesFiltered.length <= 10) {
        return (
            countriesFiltered.map( (country) => 
            <div key={country.name}>
            <Country country={country} showCountry={showCountry}/>
            </div>
            )
        )
    } else {
        return (
            <p>
            Too many matches, specify another filter
            </p>
        )
    }
}

export default Display


