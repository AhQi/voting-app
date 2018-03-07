import React from 'react';
import { Link } from 'react-router-dom';

const ShowPolls = (props) => (

		
			props.showPolls.map((polls, idx) => (
				<li key={idx}><Link to={'polls/'+ polls._id}>{polls.poll.title}</Link></li>

			))
		

)

// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class ShowAllPolls extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.state = {text: 'Now Loading', polls:[]};
	}
	
	onChange(e) {
    	this.setState({email: e.target.value});
    	this.setState({password: e.target.value});
	}
    componentDidMount(){ 
    	const { history } = this.props;
    
        
      fetch('/GET/polls', {
    	   method: 'GET',
    	   credentials: 'include'
    	}).then((resp)=>{ return resp.json() })
    	  .then((respData)=>{ 
    	    console.log(respData);

    	    this.setState({polls: respData});
    	    this.setState({text: 'See:'});
    	    //console.log(this.state.polls);
    	}); 
        
    	
    	
    }
    
	render() {
	    return (
	      <div>
	        <h3>All available Polls</h3>
	        <p> {this.state.text}</p>
	        <ul>
                <ShowPolls showPolls={this.state.polls} />
	        </ul>
	      </div>
	    );
	}
}
export default ShowAllPolls;

