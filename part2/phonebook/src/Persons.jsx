const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </ul>
  )
}

export default Persons