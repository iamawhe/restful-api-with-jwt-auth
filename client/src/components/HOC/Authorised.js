import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Authorised => {
	//check user is auth, and give access (authorise)
	class Authorise extends Component {
		checkAuthed() {
			if (!this.props.isAuthed && !this.props.token) {
				this.props.history.push('/');
			}
		}

		componentDidMount() {
			//run fn()
			this.checkAuthed();
		}

		componentDidUpdate() {
			//run fn()
			this.checkAuthed();
		}

		render() {
			return <Authorised {...this.props} />;
		}
	}

	const mapStateToProps = state => {
		return {
			isAuthed: state.auth.isAuthed,
			token: state.auth.token
		};
	};

	return connect(mapStateToProps)(Authorise);
};
