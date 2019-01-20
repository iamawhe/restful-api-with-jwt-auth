import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import Authorised from '../HOC/Authorised';

class App extends Component {
	render() {
		return (
			<div className="">
				<div className="container">
					<BrowserRouter>
						<>
							<Header />
							<Route path="/" exact component={Landing} />
							<Route path="/Dashboard" exact component={Authorised(Dashboard)} />
							<Route path="/LogIn" component={LogIn} />
							<Route path="/SignUp" component={SignUp} />
						</>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default App;
