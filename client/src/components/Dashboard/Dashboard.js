import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Dashboard.css';
import * as actions from '../../actions';

class Dashboard extends Component {
	async componentDidMount() {
		//get resource
		if (this.props.isAuthed) {
			await this.props.getPrivateResource();
		}
	}

	render() {
		return (
			<div className="Home">
				<h3>Dashboard for admin....</h3>
				<p>The secret is: {this.props.resource} </p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		resource: state.resource.secret
	};
};
export default connect(
	mapStateToProps,
	actions
)(Dashboard);
