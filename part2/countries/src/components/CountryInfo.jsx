const CountryInfo = ({data: result}) => {
    const languages = Object.values(result.languages);
    
    return (
        <article key={`${result.area}_${result.latlng[0]}${result.latlng[1]}`}>
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
            <p style={{"display": "flex", "flexDirection": "column"}}>
                <span>Flag:</span>
                <span style={{"fontSize": "5rem"}}>{result.flag}</span>
            </p>
        </article>
    )
}

export default CountryInfo;