import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import LogOut from '../LogOut/LogOut';

class App extends Component {
	render() {
		return (
			<div className="">
				<div className="container">
					<BrowserRouter>
						<>
							<Header />
							<Route path="/" exact component={Landing} />
							<Route path="/login" component={LogIn} />
							<Route path="/Signup" component={SignUp} />
							<Route path="/LogOut" component={LogOut} />
						</>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default App;
