const Persons = ({list}) => {
    return (
        <table>
            <tbody>
                {list.map(person => <tr key={person.id}><td style={{paddingRight: '15px'}}>{person.name}</td><td>{person.number}</td></tr>)}
            </tbody>
        </table>
    )
}

export default Persons;