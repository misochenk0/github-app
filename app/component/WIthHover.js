import React from 'react';

export default function WithHover(Component, propName = 'hovering') {
	return class WithHover extends React.Component {
		constructor(props) {
			super(props)
	
			this.state = {
				hovering:false
			}
		}
	
	
		mouseOver = () => {
			this.setState({
				hovering:true
			})
		}
	
		mouseOut = () => {
			this.setState({
				hovering:false
			})
		}

		render () {
			const props = {
				[propName]: this.state.hovering,
				...this.props
			}

			return  (
				<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<Component {...props}/>
				</div>
			)
		}
	}
} 