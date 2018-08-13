// fullstackopen @villeheilala
// Tehtävät 1.6-1.11

import React from 'react';
import ReactDOM from 'react-dom';

const Title = () => <h1>Anna palautetta</h1>

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistics = ({ hyva, neutraali, huono, keskiarvo, positiivisia }) => {
	if (hyva + neutraali + huono > 0) { return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>Hyvä</td>
						<td>{hyva}</td>
					</tr>
					<tr>
						<td>Neutraali</td>
						<td>{neutraali}</td>
					</tr>
					<tr>
						<td>Huono</td>
						<td>{huono}</td>
					</tr>
					<tr>
						<td>Keskiarvo</td>
						<td>{keskiarvo}</td>
					</tr>
					<tr>
						<td>Positiivisia</td>
						<td>{positiivisia} %</td>
					</tr>
				</tbody>
			</table>
		</div>
	)} return (
		<div>
			<p>Yhtään palautetta ei ole annettu.</p>
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hyva: 0,
			neutraali: 0,
			huono: 0,
			keskiarvo: () => {
				const mean = (this.state.hyva + (-1 * this.state.huono)) /
					(this.state.hyva + this.state.neutraali + this.state.huono)
				if (mean) return Number.parseFloat(mean).toFixed(2)
				return 0
			},
			positiivisia: () => {
				const positive = this.state.hyva / (this.state.hyva +
					this.state.huono + this.state.neutraali) * 100
				if (positive) return Number.parseFloat(positive).toFixed(2)
				return 0
			}
		}
	}

	clickButton = (value) => () => this.setState({ [value]: this.state[value] + 1 })

	render() {
		return (
			<div>
				<Title />
				<Button handleClick={this.clickButton("hyva")} text="Hyvä" />
				<Button handleClick={this.clickButton("neutraali")} text="Neutraali" />
				<Button handleClick={this.clickButton("huono")} text="Huono" />
				<h2>Statistiikka</h2>
				<Statistics
					hyva={this.state.hyva}
					neutraali={this.state.neutraali}
					huono={this.state.huono}
					keskiarvo={this.state.keskiarvo()}
					positiivisia={this.state.positiivisia()}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
