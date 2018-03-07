import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ShowAllPolls from './allPolls'
import PollDetail from './pollDetail'


// The Roster component matches one of two different routes
// depending on the full pathname


class Polls extends React.Component{
  constructor(props) {
		super(props);
		console.log(props);
		
		this.state = {};
	}
	
  render(){
    return(
      <Switch>
        <Route path='/polls/:id' render={props => <PollDetail authenedStatus={this.props.authenedStatus} {...props} />}/>
      
      </Switch>
  );
  }
}
export default Polls
