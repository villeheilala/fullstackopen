import React from 'react'

const Kurssi = ({ kurssi }) => {
	return (
		<div>
			<Otsikko nimi={kurssi.nimi} />
			<Sisalto osat={kurssi.osat} />
			<Yhteensa osat={kurssi.osat} />
		</div>
	)
}

const Sisalto = ({ osat }) => {
	return (
		<div>
			<ul>
				{osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
			</ul>
		</div>
	)
}

const Osa = ({ nimi, tehtavia }) => {
	return (
		<div>
			<li>{nimi}, {tehtavia} tehtävää</li>
		</div>
	)
}

const Otsikko = ({ nimi }) => <h2>{nimi}</h2>

const Yhteensa = ({ osat }) => {
	return (
		<div>

			<p>Yhteensä {osat.reduce((accumulator, currentValue) => 
				accumulator + currentValue.tehtavia, 0)} tehtävää</p>
		</div>
	)
}

export default Kurssi
