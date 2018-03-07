import React from 'react';
import Modal, {closeStyle} from 'simple-react-modal';

const OptionList = (props) => (
	props.optionLists.map((val,idx)=>(<p key={idx}>{val}</p>))
	
		
)
// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class NewPoll extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleOptionAdd = this.handleOptionAdd.bind(this);
		this.state = {text:'',alertMsg:'', options:[]};
	}
	
	componentDidMount(){
	    const { history } = this.props;
	    
	    if(this.props.authenedStatus.isAuthened === false){
	        history.push('/login');
	    }
    
	}
	
	onChange(e) {
    	this.setState({text: e.target.value});
	}
	
	close(){
	    this.setState({show: false})
	}
	
	handleOptionAdd(e){
		e.preventDefault();
		if(this.refs.options.value.trim() === ''){
			this.setState({alertMsg: "You can't add empty option!" });
    		return this.setState({show: true});
		}
		const nextOptions = this.state.options.concat([this.refs.options.value]);
    	//const nextText = '';
    	this.setState({text:'',options: nextOptions});
	}
	
	handleSubmit(e) {
    	e.preventDefault();
    	if(this.refs.title.value.trim() === '' ){
    		this.setState({alertMsg: "Please don't leave any field empty" });
    		return this.setState({show: true});
    	}
    	
    	if(this.state.options.length<2){
    		this.setState({alertMsg: "you have to set more than 2 options"});
    		return this.setState({show: true});
    	}
    	
    	const { history } = this.props;
    	const data = {
	      	title: this.refs.title.value,
	      	options: this.state.options
	      };
    	
    	fetch('/POST/polls', {
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
	    		this.props.loginChk(true);
	    		history.push('/');
	    	}else{
	    		console.log(respData);
	    		history.push('/polls/'+respData._id);
	    	}
	    });
    	
	}
	render() {
	    return (
	      <div>
	        <h3>Make new Poll</h3>
			<Modal show={this.state.show} >
			<a style={closeStyle} onClick={this.close.bind(this)}>X</a>
			  <div>{this.state.alertMsg}</div>
			</Modal>
	        <form onSubmit={this.handleSubmit}>
		    	<p>
		          <label htmlFor="title">title</label>
		        </p>
		        
			    <input ref="title" type="text" />
			    <p>
			    	<label htmlFor="options">options </label>
				</p>
				<OptionList optionLists={this.state.options} />
				<p>
				    	<input ref="options" type="text" onChange={this.onChange} value={this.state.text}/>
				    	<button type="button" onClick={this.handleOptionAdd}>{'Add'}</button>
				</p>
		        
			 <button>{'submit'}</button> 
	        </form>
	        
		    
	      </div>
	    );
	}
}
export default NewPoll;

