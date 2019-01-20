import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import * as action from '../../actions';

class Header extends Component {
	//using arrow fn() to bind 'this' instead of constructor fn

	logOut = () => {
		console.log('logOut clicked');
		this.props.logOut();
	};

	renderContent = () => {
		switch (this.props.isAuth) {
			case true:
				return (
					<>
						<li className="nav-item">
							<Link className="nav-link" to="/secret">
								secret
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/" onClick={this.logOut}>
								Log Out
							</Link>
						</li>
					</>
				);
			default:
				return (
					<>
						<li className="nav-item active">
							<Link className="nav-link" to="/signup">
								Sign up
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Log In
							</Link>
						</li>
					</>
				);
		}
	};
	render() {
		return (
			<nav
				className="navbar navbar-expand-lg navbar-dark bg-dark"
				style={{ marginBottom: '30px' }}
			>
				<Link className="navbar-brand" to="/">
					Identity <span className="sr-only">(current)</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuthed
	};
};
export default connect(
	mapStateToProps,
	action
)(Header);

/* export default Header; */
