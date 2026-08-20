const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}{' '}
      <button onClick={() => deletePerson(person)}>delete</button>
    </li>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person => (
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  )
}

export default Persons
