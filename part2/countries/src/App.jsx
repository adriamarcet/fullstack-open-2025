import { useState, useEffect } from "react";
import axios from 'axios';
import Searchresults from "./components/SearchResults";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => response.data).then(result => setCountries(result))
  }, [searchQuery]);

  const handleSearch = event => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    
    if(newQuery) {
      const matches = countries.filter(country => {
        const commonName = country.name.common;
        return commonName.toLowerCase().includes(newQuery.toLowerCase())
      })
      console.log('matches', matches);
      
      setSearchResults(matches);
    }else {
      setSearchResults([]);
    }
  }

  return (
    <>
      <h1>Check countries basic information</h1>
      <section>
        <h2>Find countries</h2>
        <fieldset>
          <label htmlFor="search">Search country by name</label>
          <input id="search" type="search" value={searchQuery} onChange={ e => handleSearch(e)} />
        </fieldset>
        <div>
          <Searchresults data={searchResults} query={searchQuery} />
        </div>
      </section>
    </>
  )
}

export default App
