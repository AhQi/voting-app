import React from 'react';



// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class UserLogin extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {text:''};
	}
	

	handleSubmit(e) {
    	e.preventDefault();
    	
    	const { history } = this.props;
    	const data = {
	      	email: this.refs.email.value,
	      	password: this.refs.password.value
	      };
    	console.log(this.refs.email.value);
    	fetch('/login', {
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
	    	}else{
	    		console.log(respData);
	    	}
	    });
    	
	}
	render() {
	    return (
	      <div>
	        <h3>Login</h3>

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
export default UserLogin;

