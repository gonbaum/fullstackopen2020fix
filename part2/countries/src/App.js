import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Display from './components/Display'
import Search from './components/Search'

function App() {

  // App State

  const [data, setData] = useState([])
  const [capitalCity, setCapitalCity] = useState('Helsinki')
  const [weather, setWeather] = useState([])
  const [filter, setFilter] = useState('')

  // App Effects

  useEffect(()=>{
    console.log('contacting server for countries information...')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('succesfull response from the countries server')
        setData(response.data)
      })  
  },[])

  useEffect(()=>{
    console.log('contacting server for weather information...')
    axios
      .get(`http://api.weatherstack.com/current?access_key=ac27ca4b380efed71d059c92b0b336b5&query=${capitalCity}`)
      .then(response => {
        console.log('succesfull response from the weather server')
        console.log(response.data)
        let data = response.data
        setWeather(data)
      })  
    },[capitalCity])

  // App handlers
  
  const handleFilterChange = (event) => {
    if(weather.hasOwnProperty('error')) {
      alert(`${weather.error.type}`)
    } else {
      setFilter(event.target.value)
    }
  }

  // This handler is going to be passed to the display component to allow users to click a show button to access country information
  const showCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  // This handlers is going to be  passed to the display component to be triggered when we get to one only result, so we can display full info
  const handleCountryChange = (capital) => setCapitalCity(capital)

  return (
    <div>
      <Search 
        text='Search: ' 
        value={filter} 
        onChange={handleFilterChange}
      />
      <Display 
        countries={data}
        filter={filter}
        weather={weather}
        showCountry={showCountry}
        handleCountryChange={handleCountryChange}
      />
    </div>
  );
}

export default App;
