// fullstackopen 2018
// ex. 2.6-2.11
// Ville Heilala

import React from 'react';

const Person = ({ name, phone }) => (
	<tr>
		<td>{ name }</td>
		<td>{ phone }</td>
	</tr>
)

const Filter = ({ value, onChange }) => (
	<div>
		hakuehto: <input
			value = { value }
			onChange = { onChange }
		/>
	</div>
)

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [
				{ name: 'Arto Hellas', phone: '040-123456' },
				{ name: 'Martti Tienari', phone: '040-123456' },
				{ name: 'Arto Järvinen', phone: '040-123456' },
				{ name: 'Lea Kutvonen', phone: '040-123456' }
			],
			newName: "",
			newPhone: "",
			filter: ""
		}
	}

	addPerson = (event) => {
		event.preventDefault()
		if (this.state.persons.some(person => person.name.toLowerCase() === this.state.newName.toLowerCase())) {
			alert("Henkilön tiedot ovat jo luettelossa!")
		} else {
			const personObject = {
				name: this.state.newName,
				phone: this.state.newPhone
			}
			const persons = this.state.persons.concat(personObject)
			this.setState({
				persons,
				newName: "",
				newPhone: ""
			})
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
				<Filter value={this.state.filter} onChange={this.handleFilterChange} />
				<h2>Lisää uusi</h2>
				<form onSubmit={this.addPerson}>
					<div>
						nimi: <input
							value={this.state.newName}
							onChange={this.handleNameChange}
						/>
					</div>
					<div>
						numero: <input
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
								.map(person => <Person key={person.name} name={person.name}phone={person.phone} />)
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
