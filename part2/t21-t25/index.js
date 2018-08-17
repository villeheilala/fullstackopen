// fullstackopen @villeheilala
// Part 1 Assignments 2.1-2.5

import React from 'react';
import ReactDOM from 'react-dom';
import Kurssi from './Kurssi'

const App = () => {
	const kurssit = [
		{
			nimi: 'Half Stack -sovelluskehitys',
			id: 1,
			osat: [
				{
					nimi: 'Reactin perusteet',
					tehtavia: 10,
					id: 1
				},
				{
					nimi: 'Tiedonvälitys propseilla',
					tehtavia: 7,
					id: 3
				}
			]
		},
		{
			nimi: 'Node.js',
			id: 2,
			osat: [
				{
					nimi: 'Routing',
					tehtavia: 3,
					id: 1
				},
				{
					nimi: 'Middlewaret',
					tehtavia: 7,
					id: 2
				}
			]
		}
	]
	return (
		<div>
			<h1>Tarjolla olevat kurssit</h1>
			{kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
