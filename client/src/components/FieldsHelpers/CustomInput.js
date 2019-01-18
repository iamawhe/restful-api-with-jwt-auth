import React, { Component } from 'react';

/* inorder to style the field, you need to create a custom component abd attach it */

export default class CustomInput extends Component {
	render() {
		const {
			input: { value, onChange }
		} = this.props;
		return (
			<div className="form-group">
				<label htmlFor={this.props.email}>{this.props.label}</label>
				<input
					name={this.props.name}
					id={this.props.id}
					placeholder={this.props.placeholder}
					autoComplete={this.props.autoComplete}
					type={this.props.type}
					className="form-control"
					value={value}
					onChange={onChange}
				/>
			</div>
		);
	}
}
