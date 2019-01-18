import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import './SignUp.css';
import CustomInput from '../FieldsHelpers/CustomInput';
import * as actions from '../../actions';

class SignUp extends Component {
	//using arrow fn() to bind 'this' instead of constructor fn()

	onSubmit = async formData => {
		//invoke an actionCreator
		await this.props.signUp(formData);
	};
	onSubmit1 = async () => {
		//invoke an actionCreator
		await this.props.getSecret();
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="SignUp">
				<div className="row">
					<div className="col">
						<h4>SignUp</h4>
						<form onSubmit={handleSubmit(this.onSubmit)}>
							<fieldset>
								<Field
									name="email"
									type="text"
									id="email"
									placeholder="your@email.com"
									autoComplete="email"
									component={CustomInput}
								/>
							</fieldset>
							<fieldset>
								<Field
									name="password"
									type="password"
									id="password"
									placeholder="password"
									autoComplete="new-password"
									component={CustomInput}
								/>
							</fieldset>
							{this.props.errorMsg ? (
								<div className="alert alert-danger">{this.props.errorMsg}</div>
							) : null}
							<button className="btn btn-primary" type="submit">
								Sign up
							</button>
						</form>
					</div>
					<div className="col">
						<div className="text-center">
							<div className="alert alert-primary">
								Or signin with third-party serveice
							</div>
							<button className="btn btn-default btn-danger">Google</button>
							<button className="btn btn-default btn-primary">Facebook</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		errorMsg: state.auth.errorMsg
	};
};
export default compose(
	connect(
		mapStateToProps,
		actions
	),
	reduxForm({
		form: 'signUp' // a unique identifier for this form
	})
)(SignUp);
