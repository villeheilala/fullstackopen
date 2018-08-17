// fullstackopen @villeheilala
// Part 1 Assignments 1.12-1.14

import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
	<div>
		<button onClick={handleClick}>
			{text}
		</button>
	</div>
)

const Votes = ({ votes }) => (
	<div>
		<p>This quote has {votes} votes</p>
	</div>
)

const Best = ({ best, votes }) => (
	<div>
		<h2>Best quote ever!</h2>
		<p>{anecdotes[best]}</p>
		<p>This quote has {votes} votes</p>
	</div>
)

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			votes: [0, 0, 0, 0, 0, 0]
		}
	}

	clickRandomizeButton = (select) => () => { this.setState({ selected: select}) }

	clickVoteButton = ({ selected, votes }) => () => {
		const votesCopy = [...votes]
		votesCopy[selected] += 1
		this.setState({ votes: votesCopy })
	}

	render() {
		const best = this.state.votes.indexOf(Math.max(...this.state.votes))
		return (
			<div>
				<h1>Quote of the day</h1>
				{this.props.anecdotes[this.state.selected]}
				<Button handleClick={this.clickRandomizeButton(Math.floor(Math.random() * 6))} text="Random quote"/>
				<Button handleClick={this.clickVoteButton(this.state)} text="Vote" />
				<Votes votes={this.state.votes[this.state.selected]} />
				<Best best={best} votes={this.state.votes[best]} />
			</div>
		)
	}
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. The refore, if you write the code as cleverly as possible, you are, by defini tion, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes}/>,
	document.getElementById('root')
)
