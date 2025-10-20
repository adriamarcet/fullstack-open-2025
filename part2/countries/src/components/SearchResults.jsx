const Searchresults = ({data, query}) => {
    const hasData = () => data.length !== 0;
    const hasQuery = () => query.length !== 0;
    
    if(!hasQuery() && !hasData()) {
        return (
            <p>Please enter a country name in the search box to start filtering.</p>
        )
    }
    
    if(hasQuery() && hasData()) {
        if(data.length <= 10 && data.length > 1 ) {
            console.log('hey mes de 1 menys de 10');

            return (
                <ul>
                    {
                        data.map(result => <li key={`${result.area}_${result.latlng[0]}${result.latlng[1]}`}>{result.name.common}</li>)
                    }
                </ul>
            )
        } else if(data.length <= 10 && data.length === 1) {
            console.log('data', data[0]);
            
            
            return (
                <>
                    {
                        data.map((result) => {
                            const languages = Object.values(result.languages);

                            return <article key={`${result.area}_${result.latlng[0]}${result.latlng[1]}`}>
                                <h1>{result.name.common}</h1>
                                <ul>
                                    <li>Capital: {result.capital[0]}</li>
                                    <li>Area: {result.area}</li>
                                    <li>Spoken language: 
                                        {
                                            languages.length > 1 ? (
                                                <ul>
                                                    {
                                                        languages.map((l, idx) => <li key={idx}>{l}</li>)
                                                    }
                                                </ul>
                                            ) : (
                                                <span>{languages[0]}</span>
                                            )
                                        }
                                    </li>
                                </ul>
                                <p style={{"display": "flex", "flex-direction": "column"}}>
                                    <span>Flag:</span>
                                    <span style={{"fontSize": "5rem"}}>{result.flag}</span>
                                </p>
                            </article>
                        })
                    }
                </>
            )
        } else {
            return (
                <p>Too many results for this name, please precise search value with more characters.</p>
            )
        }
    } else {
        return (
            <p>No search results for this name.</p>
        )
    }
}

export default Searchresults;