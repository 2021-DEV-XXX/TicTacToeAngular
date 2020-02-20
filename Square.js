import React from 'react';
import './Square.css';


class Square extends React.Component {
	constructor(props) {
		super(props);
	}
	
	
	
	render() {
		return (
			<span
				onClick={this.props.onClick}
				className="square"
			>
				{this.props.value}
			</span>
		);
	}
}


/*
const Square = ({id}) => (
	<span className="square" id={`${id}`} onclick=""></span>
);


*/
export default Square;