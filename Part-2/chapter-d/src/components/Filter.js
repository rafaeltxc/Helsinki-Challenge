const Filter = ({filter, onChange}) => {
    return (
        <div>
            <label>filter shown with: </label>
            <input value={filter} onChange={onChange}/>
        </div>
    )
}

export default Filter;