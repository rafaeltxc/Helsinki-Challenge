const PersonForms = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            <div>
                <label>name: </label>
                <input value={props.newName} onChange={props.onChangeName} required />
            </div>
            <div>
                <label>number: </label>
                <input value={props.newNumber} onChange={props.onChangeNumber} required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForms