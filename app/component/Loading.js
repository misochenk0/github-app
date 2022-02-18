import React from 'react';
import PropTypes from 'prop-types';
const styles = {
	content: {
		fontSize: '35px',
		position: 'absolute',
		left: "0",
		top: "0",
		width: "100%",
		textAlign: "center",
		marginTop: '20px'
	}
}

export default class Loading extends React.Component {

	state = {
		content: this.props.text
	}
	componentDidMount() {
		const {speed, text} = this.props

		this.interval = window.setInterval(() => {
			if(this.state.content === text + '...') {
				this.setState({content: text})
			} else {
				this.setState(state => ({
					content: state.content + "."
				}))
			}
		}, speed)
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
	}

	render() {
		return (
			<p style={styles.content}>
				{this.state.content}
			</p>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}