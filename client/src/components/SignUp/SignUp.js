import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import './SignUp.css';
import CustomInput from '../FieldsHelpers/CustomInput';
import * as actions from '../../actions';

class SignUp extends Component {
	//using arrow fn() to bind 'this' instead of constructor fn

	onSubmit = async formData => {
		//invoke an actionCreator
		await this.props.signUp(formData);
		if (!this.props.errorMsg) {
			this.props.history.push('/dashboard');
		}
	};

	responseGoogle = async res => {
		await this.props.googleOAuth(res.accessToken);
		if (!this.props.errorMsg) {
			this.props.history.push('/dashboard');
		}
	};

	responseFacebook = async res => {
		await this.props.facebookOAuth(res.accessToken);
		if (!this.props.errorMsg) {
			this.props.history.push('/dashboard');
		}
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

							<GoogleLogin
								clientId="497592538872-a2surr8p1kihma26o10f1nfue5s6ki9b.apps.googleusercontent.com"
								buttonText="Google"
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
								cssClass="btn btn-outline-danger"
							/>
							<FacebookLogin
								appId="515936692249227"
								textButton="Facebook"
								fields="name,email,picture"
								callback={this.responseFacebook}
								cssClass="btn btn-outline-primary"
							/>
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
