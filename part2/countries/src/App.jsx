import { useState, useEffect } from "react";
import axios from 'axios';
import SearchResults from "./components/SearchResults";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => response.data).then(result => setCountries(result))
  }, []);

  const handleSearch = event => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    
    if(newQuery) {
      const matches = countries.filter(country => {
        const commonName = country.name.common;
        return commonName.toLowerCase().includes(newQuery.toLowerCase())
      })

      setSearchResults(matches);
    }else {
      setSearchResults([]);
    }
  }

  const handleShowSingle = result => {
    setSearchQuery(result.name.common)
    setSearchResults([result])
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
          <SearchResults data={searchResults} query={searchQuery} handleShowSingle={handleShowSingle} />
        </div>
      </section>
    </>
  )
}

export default App
