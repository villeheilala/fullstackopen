import React from 'react';
import axios from 'axios';

const Country = ({ name, onClick }) => (
	<li onClick={onClick} value={name}>{name}</li>
)

const CountryDetails = ({ country }) => (
<div>
	<h1>{country.name} {country.nativeName}</h1>
	<p>Capital: {country.capital}</p>
	<p>Population: {country.population}</p>
	<img src={country.flag} alt="flag" style={imgStyle}></img>
</div>
)

const imgStyle = {
  width: "25%"
}

const Details = ({ countries, onClick }) => {
	if (countries.length === 1) {
		return (
			<div>
				<CountryDetails key={countries[0].name} country={countries[0]} />
			</div>
		)
	} else if (countries.length < 6) {
		return (
			<div>
				<ol>
					{countries.map(country => <Country key={country.name} name={country.name} onClick={onClick} />)}
				</ol>
			</div>
		)
	} else {
		return (
			<div>
				<p>Over 5 countries found.</p>
			</div>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.handleCountryClick = this.handleCountryClick.bind(this)
		this.state = {
			countries: [],
			filter: ""
		}
	}

	componentDidMount() {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then(response => {
				this.setState({ countries: response.data })
			})
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}
	
	handleCountryClick = (event) => {
		this.setState({ filter: event.target.innerText })
	}

	render() {
		const countries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
		return (
			<div className="App">
				<div>
					Find countries: <input
						value={this.state.filter}
						onChange={this.handleFilterChange}
					/>
				</div>
				<div>
					<Details countries={countries} onClick={this.handleCountryClick} />
				</div>
			</div>
		);
	}
}

export default App;
