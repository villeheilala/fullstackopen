// fullstackopen 2018
// ex. 2.6-2.19
// Ville Heilala

import React from 'react';
import personService from './services/persons'
import './index.css'

const Person = ({ name, phone, id, deletePerson }) => (
	<tr>
		<td>{ name }</td>
		<td>{ phone }</td>
		<td><button id={ id } onClick={deletePerson}>delete</button></td>
	</tr>
)

const Filter = ({ value, onChange }) => (
	<div>
		Find: <input
			value = { value }
			onChange = { onChange }
		/>
	</div>
)

const Notification = ({ type, text }) => {
	if (text === null) {
		return null
	}
	return (
		<div className={type}>
			{text}
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [],
			newName: "",
			newPhone: "",
			filter: "",
			message: {
				type: null,
				text: null
			}
		}
	}

	componentDidMount() {
		personService
			.getAll()
			.then(response => {
				this.setState({ persons: response })
			})
	}

	addPerson = (event) => {
		event.preventDefault()
		// if name exists, ask and update phone number
		const personObject = this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())
		if (personObject) {
			if (window.confirm(this.state.newName + " exists. Replace phone number?")) {
				personObject["phone"] = this.state.newPhone
				personService
					.update(personObject.id, personObject)
					.then(changedPerson => {
						this.setState({
							persons: this.state.persons.map(person => person.id !== changedPerson.id ? person : changedPerson),
							message: {
								type: "info",
								text: `Person ${changedPerson.name} phone number changed.`
							}
						})
						setTimeout(() => {
							this.setState({
								message: {
									type: null,
									text: null
								}
							})
						}, 5000)
					})
					.catch(error => {
						this.setState({
							message: {
								type: "error",
								text: `Person ${personObject.name} is already deleted.`
							},
							persons: this.state.persons.filter(person => person.id !== personObject.id)
						})
						setTimeout(() => {
							this.setState({
								message: {
									type: null,
									text: null
								}
							})
						}, 5000)
					})
		}
			// in case of new person, create new person
		} else {
			const personObject = {
				name: this.state.newName,
				phone: this.state.newPhone
			}
			personService
				.create(personObject)
				.then(newPerson => {
					this.setState({
						persons: this.state.persons.concat(newPerson),
						newName: '',
						newPhone: ''
					})
				})
				.then(() => {
					this.setState({
						message: {
							type: "info",
							text: `New person ${personObject.name} added.`
						}
					})
					setTimeout(() => {
						this.setState({
							message: {
								type: null,
								text: null
							}
						})
					}, 5000)
				})
		}
	}

	deletePerson = (id, name) => {
		return () => {
			if (window.confirm(`Delete ${name} ?`)) {
				personService
					.deletePerson(id)
					.then(deletedPerson => {
						const persons = this.state.persons.filter(person => person.id !== id)
						this.setState({
							persons,
							message: {
								type: "info",
								text: `Deleted person ${name}.`
							}
						})
						setTimeout(() => {
							this.setState({
								message: {
									type: null,
									text: null
								}
							})
						}, 5000)
					})
			}
		}
	}

	handleNameChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	handlePhoneChange = (event) => {
		this.setState({ newPhone: event.target.value })
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}

	render() {
		return (
			<div>
				<h1>Puhelinluettelo</h1>
				<Notification type={this.state.message.type} text={this.state.message.text} />
				<Filter value={this.state.filter} onChange={this.handleFilterChange} />
				<h2>Lisää uusi</h2>
				<form onSubmit={this.addPerson}>
					<div>
						Name: <input
							value={this.state.newName}
							onChange={this.handleNameChange}
						/>
					</div>
					<div>
						Phone: <input
							value={this.state.newPhone}
							onChange={this.handlePhoneChange}
						/>
					</div>
					<div>
						<button type="submit">Lisää</button>
					</div>
				</form>
				<h2>Numerot</h2>
				<table>
					<tbody>
						{this.state.persons
								.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
								.map(person => <Person 
									key={person.name}
									name={person.name}
									phone={person.phone} 
									id={person.id}
									deletePerson={this.deletePerson(person.id, person.name)}
								/>)
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
