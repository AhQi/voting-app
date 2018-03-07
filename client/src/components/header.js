import React from 'react'
import { Link } from 'react-router-dom'
import '../header.css'
const ShowPrivateLink = (props) => (

		
			props.showLink.map((link, idx) => (
				<li className="header-li" key={idx}><Link className="header-li-a" to={"/"+link}>{link}</Link></li>

			))
		

)
// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component {
	constructor(props) {
		super(props);

		// 初始 state，等於 ES5 中的 getInitialState
		this.state = {
			privateLink: ['Logout', 'AddPoll', 'MyPolls'],
			publicLink: ['Login', 'SignUp'],
			showLink: [],
		}
	}

	// componentDidMount 為 component 生命週期中階段 component 已插入節點的階段，通常一些非同步操作都會放置在這個階段。這便是每1秒鐘會去呼叫 tick 方法
	componentDidMount() {
	    //this.interval = setInterval(this.tick, 1000);
	}
	
	componentWillMount() {
		this.setState({showLink: (this.props.authenedStatus.isAuthened === false)? this.state.publicLink : this.state.privateLink});
	}
	// componentWillUnmount 為 component 生命週期中 component 即將移出插入的節點的階段。這邊移除了 setInterval 效力
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	componentWillReceiveProps(nextProps){
	  console.log(nextProps);
	  
	    this.setState({showLink: (nextProps.authenedStatus.isAuthened === false)? this.state.publicLink : this.state.privateLink});
	  
	  
	}
	// render 為 class Component 中唯一需要定義的方法，其回傳 component 欲顯示的內容
	render() {
	    return (
	      <header>
          <nav>
            <ul className="header-ul">
              <li className="header-li"><Link className="header-li-a" to='/'>Home</Link></li>
              
              <ShowPrivateLink showLink={this.state.showLink} />
            </ul>
          </nav>
        </header>
	    );
	}
}

// ReactDOM.render(<Timer />, document.getElementById('app'));
// const Header = () => (
//   <header>
//     <nav>
//       <ul>
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='/roster'>Roster</Link></li>
//         <li><Link to='/login'>Login</Link></li>
//       </ul>
//     </nav>
//   </header>
// )

export default Header
