import React from 'react';
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types';
import {ThemeConsumer} from "../contexts/theme"
import { Link } from "react-router-dom"

function Instructions () {
	return (
		<ThemeConsumer>
			{({theme}) => (
				<div className='instructions-container'>
					<h1 className="center-text header-lg">
						Instructions
					</h1>
					<ol className="container-sm grid center-text battle-instructions">
						<li>
							<h3 className="header-sm">Enter two Github users</h3>
							<FaUserFriends className={`bg-${theme}`} color="#727272" size={140}/>
						</li>
						<li>
							<h3 className="header-sm">Battle</h3>
							<FaFighterJet className={`bg-${theme}`} color="rgb(255,191,116)" size={140}/>
						</li>
						<li>
							<h3 className="header-sm">See the winners</h3>
							<FaTrophy className={`bg-${theme}`} color="rgb(255,215,0)" size={140}/>
						</li>
					</ol>
				</div>
			)}
		</ThemeConsumer>
	)
}

class PlayerInput extends React.Component {

	state = {
		username: ""
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.onSubmit(this.state.username)
	}
	handleChange = (e) => {
		this.setState({
			username: e.target.value
		})
	}

	
	
	render() {
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<form className="column player" onSubmit={this.handleSubmit}>
						<label htmlFor="username" className='player-label'> 
							{this.props.label}
						</label>
						<div className="player-inputs row">
							<input 
								type="text" 
								id="username" 
								className={`input-${theme}`}
								placeholder='github username' 
								autoComplete='off' 
								value={this.state.username} 
								onChange={this.handleChange}
							/>
							<button className={`btn-${theme === 'dark' ? 'light' : 'dark'} btn`} type='submit' disabled={!this.state.username}>Submit</button>
						</div>
					</form>
				)}
			</ThemeConsumer>
			
		)
	}
}
PlayerInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
}
function PlayerPreview ({username, onReset, label}) {
	
	return (
		<ThemeConsumer>
		{({theme}) => (
			<div className="column player">
				<h3 className="player-label">{label}</h3>
				<div className={`bg-${theme} row`}>
					<div className="player-info">
						<img src={`https://github.com/${username}.png?size=200`} alt={`Avatar for ${username}`} className="avatar-small" />
						<a href={`https://guthub.com/${username}`} className="link">{username}</a>
					</div>
					<button className="btn-clear flex-center" onClick={onReset}>
						<FaTimesCircle color="rgb(194,57,42)" size={26}/>
					</button>
				</div>
			</div>
		)}
		</ThemeConsumer>
	)
}

PlayerPreview.propTypes = {
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
}
export default class Battle extends React.Component {

	state = {
		playerOne: null,
		playerTwo: null,
		// battle: false
	}

	handleSubmit = (id, player) => {
		this.setState({
			[id]: player
		})
	}
	handleReset = (id) => {
		this.setState({
			[id]: null
		})
	}

	render() {
		const {playerOne, playerTwo } = this.state

		return (
			<>
				<Instructions/>

				<div className="players-container">
					<h1 className="center-text header-lg" >Players</h1>
					<div className="space-around row">
						{playerOne === null ? 
							<PlayerInput
								label="Player One"
								onSubmit={(player) => this.handleSubmit('playerOne', player)}
							/> : <PlayerPreview username={playerOne} label='Player One' onReset={() => this.handleReset('playerOne')}/>
						}
						{playerTwo === null ?
							<PlayerInput
								label="Player Two"
								onSubmit={(player) => this.handleSubmit('playerTwo', player)}
							/> : <PlayerPreview username={playerTwo} label='Player Two' onReset={() => this.handleReset('playerTwo')} />
						}
					</div>

					{playerOne && playerTwo && (
						<Link className="btn btn-dark btn-space"
							to={{pathname: "/battle/results", search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`}} >
							Battle
						</Link>
					)}
				</div>
			</>
		)
	}
}