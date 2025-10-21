import CountryInfo from './CountryInfo';

const SearchResults = ({data, query, handleShowSingle}) => {
    const hasData = () => data.length !== 0;
    const hasQuery = () => query.length !== 0;

    if(!hasQuery() && !hasData()) {
        return (
            <p>Please enter a country name in the search box to start filtering.</p>
        )
    }
    
    if(hasQuery() && hasData()) {
        if(data.length <= 10 && data.length > 1 ) {
            return (
                <ul>
                    {
                        data.map(result => {
                        return (
                            <li 
                                key={`${result.area}_${result.latlng[0]}${result.latlng[1]}`}
                            >
                                <span>{result.name.common}</span> 
                                <button onClick={() => handleShowSingle(result)}>Show</button>
                            </li>
                        )
                    })
                    }
                </ul>
            )
        } else if(data.length === 1) {
            return (
                <>
                    <CountryInfo data={data[0]} />
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

export default SearchResults;