const AddNewPerson = ({action, newName, handleNewName, newPhone, handleNewPhone}) => {
    return (
        <form onSubmit={action} style={{display: 'flex', flexDirection: 'column'}}>
          <fieldset>
            <label htmlFor="name" style={{display: 'flex', flexDirection: 'column'}}>Name</label>
            <input id="name" type="text" value={newName} onChange={handleNewName} />
          </fieldset>
          <fieldset>
            <label htmlFor="phone" style={{display: 'flex', flexDirection: 'column'}}>
              <span>Phone number</span>
              <small>Format: 654321098</small>
            </label>
            <input id="phone" type="tel" value={newPhone} onChange={handleNewPhone} />
          </fieldset>
          <fieldset> 
            <button type="submit">add</button>
          </fieldset>
        </form>
    )
}

export default AddNewPerson;