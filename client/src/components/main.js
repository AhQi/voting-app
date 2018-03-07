import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import ShowAllPolls from './allPolls';
import UserLogin from './login';
import NotFoundPage from './notFound';
import Logout from './logout';
import NewPoll from './addPoll';
import UserSignUp from './signUp';
import UserOwnedPolls from './user';
import Polls from './polls';
import {Helmet} from "react-helmet";
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component{
  constructor(props) {
		super(props);
		console.log(props);
		
		this.state = {};
	}
	
  render(){
    return(
    <main>
      <Helmet>
		        <title>Your Poll</title>
		        <meta name="poll detail" content="" />
		  </Helmet>
      <Switch>
        <Route exact path='/' component={ShowAllPolls}/>
        <Route path='/polls' render={props => <Polls authenedStatus={this.props.authenedStatus} {...props} />}/>
        <Route exact path='/MyPolls' render={props => <UserOwnedPolls authenedStatus={this.props.authenedStatus} {...props} />}/>
        <Route exact path='/SignUp' render={props => <UserSignUp loginChk={this.props.loginChk} {...props} />}/>
        <Route exact path='/Login' render={props => <UserLogin loginChk={this.props.loginChk} {...props} />}/>
        <Route exact path='/Logout' render={props => <Logout loginChk={this.props.loginChk} {...props} />}/>
        <Route exact path='/AddPoll' render={props => <NewPoll authenedStatus={this.props.authenedStatus} {...props} />}/>
        
        <Route component={NotFoundPage} />
      </Switch>
    </main>);
  }
}


export default Main
