import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddUser from "./Components/AddUser"

import User from "./Components/User";
import UserList from "./Components/UserList";
import SignIn from "./Components/SignIn";
import SignInSide from "./Components/SignInSide";
import { Component } from "react";
import AuthService from "./Services/auth.service";
import IUserData from './types/User';
import Login from "./Components/login.component";
import EventBus from "./Common/EventBus";
import ServiceRequest from "./Components/ServiceRequest";
import RequestList from "./Components/RequestList";
import AddRequest from "./Components/AddRequest";

type Props = {};

type State = {  
  currentUser: IUserData | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }
  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;
console.log(localStorage.getItem("user"));
  return (
    
    <div >
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      
    {localStorage.getItem("user")?(
       <div className="navbar-nav mr-auto">
       <li className="nav-item">
         <Link to={"/users"} className="nav-link">
           Users
         </Link>
       </li>
       <li className="nav-item">
         <Link to={"/add"} className="nav-link">
           Registration          
         </Link>
       </li>
       <li className="nav-item">
         <Link to={"/requests"} className="nav-link">
           View Requests         
         </Link>
       </li>
       <li className="nav-item">
         <Link to={"/AddRequest"} className="nav-link">
           Make a request         
         </Link>
       </li>
      
       <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
     </div>
        
    ):(<div className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
    </li>            
  </div>)
  }
 
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={SignInSide} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/add" component={AddUser} />
          <Route path="/users/:id" component={User} />
          <Route exact path="/login" component={SignInSide} />
          <Route exact path="/requests" component={RequestList} />
          <Route exact path="/ServiceRequest/:id" component={ServiceRequest} />
          <Route exact path="/AddRequest" component={AddRequest} />
        </Switch>
      </div>
    </div>
  );
}
}
export default App;


