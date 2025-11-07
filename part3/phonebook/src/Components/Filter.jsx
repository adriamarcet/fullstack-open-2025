import Searchresults from "./Searchresults";

const Filter = ({search, data, handleSearch}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
        <label htmlFor="search">Search the address book by person's name</label>
        <input id="search" type="search" value={search} onChange={handleSearch} />
        {search.length > 0 && (
          <>
            <fieldset>
              <strong>Search results:</strong>
              <ul><Searchresults query={search} data={data}/></ul>
            </fieldset>
          </>
        )}
        </div>
    )
}

export default Filter;