const Filter = ({ value, onChange}) => {
    return(
        <div>
            <label>Search countries</label>
            <input value={value} onChange={onChange}/>
        </div>
    )
}


export default Filter;
