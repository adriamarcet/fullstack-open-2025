const CountryInfo = ({data: result}) => {
    const languages = Object.values(result.languages);
    
    return (
        <article>
            <h1>{result.name.common}</h1>
            <ul>
                <li>Capital: {result.capital?.[0] || 'N/A'}</li>
                <li>Area: {result.area}</li>
                <li>
                    {
                        languages.length > 1 ? (
                            <>
                                <span>Spoken languages: </span>
                                <ul>
                                    {
                                        languages.map((l, idx) => <li key={idx}><span>{l}</span></li>)
                                    }
                                </ul>
                            </>
                        ) : (
                            <>
                                <span>Spoken language: </span>
                                <span>{languages[0]}</span>
                            </>
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