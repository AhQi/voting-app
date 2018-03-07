import React from 'react';
import Modal, {closeStyle} from 'simple-react-modal';


// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class UserSignUp extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {text:'', show: false};
	}
	
	close(){
	    this.setState({show: false})
	}
	
	onChange(e) {
    	this.setState({email: e.target.value});
    	this.setState({password: e.target.value});
	}
	handleSubmit(e) {
    	e.preventDefault();
    	
    	const { history } = this.props;
    	const data = {
	      	email: this.refs.email.value,
	      	password: this.refs.password.value
	      };
    	console.log(this.refs.email.value);
    	fetch('/signup', {
	      method: 'POST',
	      credentials: 'include',
	      body: JSON.stringify(data),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    }).then((resp)=>{ return resp.json() })
	    	.then((respData)=>{ 
	    	
	    	if(respData.user !== undefined){
	    		console.log(respData.user);
	    		this.props.loginChk({isAuthened:true, user: respData.user});
	    		history.push('/');
	    	}else if(respData.error !== undefined){
	    		this.setState({text: respData.error, show:true});
	    	}
	    });
    	
	}
	render() {
	    return (
	      <div>
	        <h3>Sign Up</h3>
	        
			<Modal show={this.state.show} >
			<a style={closeStyle} onClick={this.close.bind(this)}>X</a>
			  <div>{this.state.text}</div>
			</Modal>
			
	        <form onSubmit={this.handleSubmit}>
	          <p>
		        
		          <label htmlFor="email">Enter your email</label>
			      <input ref="email" name="email" type="email" />
				</p>
				<p>
			      <label htmlFor="password">Enter your password </label>
			      <input ref="password" name="password" type="password" />
			    </p>
	        	<button>{'submit'}</button>

	        </form>
	      </div>
	    );
	}
}
export default UserSignUp;

