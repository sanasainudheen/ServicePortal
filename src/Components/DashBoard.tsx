import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AddUser from "../Components/AddUser"
import User from "../Components/User";
import UserList from "../Components/UserList";
import SignIn from "../Components/SignIn";
import SignOut from "../Components/SignOut";
import SignInSide from "../Components/SignInSide";
import { Component } from "react";
import AuthService from "../Services/auth.service";
import IUserData from '../types/User';
import Login from "../Components/login.component";
import EventBus from "../Common/EventBus";

import RequestList from "../Components/RequestList";
import AddRequest from "../Components/AddRequest";
import AddServiceRequest from "../Components/AddServiceRequest";
import Test from "../Components/Test";
import UploadFiles from "../Components/upload-files.component";
import NewUser from "../pages/newUser/NewUser";
import ProductList from "../pages/productList/ProductList";
import Product from "../pages/product/Product";
import NewProduct from "../pages/newProduct/NewProduct";
import Sidebar from "../Components/sidebar/Sidebar";
import Topbar from "../Components/topbar/Topbar";
import EditOrder from "../Components/EditOrder";
import Home from "../pages/home/Home";

const DashBoard = () => {
  return (
    <div>
    
   
    <Router>
    <Topbar />
    <div className="container">
     <Sidebar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/AddUser">
          <AddUser />
        </Route>
        <Route path="/user/:userId">
       
        </Route>
        <Route path="/ServiceRequest">
      <AddServiceRequest/>
        </Route>
        <Route path="/newUser">
          <NewUser />
        </Route>
        <Route path="/products">
          <ProductList />
        </Route>
        <Route path="/product/:productId">
          <Product />
        </Route>
        <Route path="/newproduct">
          <NewProduct />
        </Route>
        <Route exact path="/SignIn">
          <SignInSide />
        </Route>
        <Route exact path="/RequestList">
          <RequestList />
        </Route>       
        <Route path="/EditOrder/:id" component={EditOrder} />
        
        <Route path="/SignOut">
          <SignOut />
        </Route>      
       
      </Switch>
    </div>
  </Router>
   
    </div>
  )
}

export default DashBoard
