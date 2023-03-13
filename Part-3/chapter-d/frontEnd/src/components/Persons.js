const Persons = ({list, handler}) => {
    return (
        <table>
            <tbody>
                {list.map(person =>
                    <tr key={person.id}>
                        <td style={{paddingRight: '15px'}}>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button onClick={() => handler(person.id)}>delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Persons;