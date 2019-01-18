import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom:'30px'}}>
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
					<ul className="navbar-nav mr-auto">
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
						<li className="nav-item">
							<Link className="nav-link" to="/logout">
								Log Out
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
