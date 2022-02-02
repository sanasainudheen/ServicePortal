import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddUser from "./Components/AddUser"
import User from "./Components/User";
import UserList from "./Components/UserList";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import SignInSide from "./Components/SignInSide";
import { Component } from "react";
import AuthService from "./Services/auth.service";
import IUserData from './types/User';
import Login from "./Components/login.component";
import EventBus from "./Common/EventBus";
import DashBoard from "./Components/DashBoard";
import RequestList from "./Components/RequestList";
import AddRequest from "./Components/AddRequest";
import Test from "./Components/Test";
import UploadFiles from "./Components/upload-files.component";

import Sidebar from "./Components/sidebar/Sidebar";
import Topbar from "./Components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";

//import UserList from "./pages/userList/UserList";
//import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";


//type Props = {};

//type State = {  
//  currentUser: IUserData | undefined
//}

//class App extends Component<Props, State> {
  class App extends Component{
 // constructor(props: Props) {
  //  super(props);
  //  this.logOut = this.logOut.bind(this);

 //   this.state = {
 //     currentUser: undefined,
  //  };
 // }

 // componentDidMount() {
  //  const user = AuthService.getCurrentUser();
  //  if (user) {
  //    this.setState({
   //     currentUser: user
   //   });
   // }

 //   EventBus.on("logout", this.logOut);
//  }

 // componentWillUnmount() {
  //  EventBus.remove("logout", this.logOut);
 // }
 // logOut() {
 //   AuthService.logout();
 //   this.setState({
 //     currentUser: undefined,
 //   });
 // }

  render() {
    //const { currentUser} = this.state;
//console.log(localStorage.getItem("user"));

  return (
    <div>
    
   {localStorage.getItem("user")?(
    <DashBoard/>
   ):(
<div>
  <SignInSide/>
</div>
   )}
    </div>
  );
}
}
export default App;


