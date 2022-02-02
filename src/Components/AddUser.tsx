import React, { useState, ChangeEvent } from "react";
import {Link } from "react-router-dom";
import UserDataService from "../Services/UserService";
import IUserData from '../types/User';
import Button from '@mui/material/Button';
import './AddUser.css';
import { useFormik ,ErrorMessage} from 'formik'
import * as Yup from 'yup'

const AddUser: React.FC = () => {
  const initialUserState = {
    id: null,
    name: "",
    emailId: "",
    userName: "",
    password:""
  };
  const initialValues = {
    name:'',
    emailId:'',
    userName:'',
    password:''
  }
  const validationSchema = Yup.object({
              name: Yup.string()
             .required("This field is required!")
             .max(50),
             emailId: Yup.string()
              .required("This field is required!"),
              userName: Yup.string()
                .required("This field is required!")
                .max(600),
                password: Yup.string()
            .required("This field is required!"),
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {      
     saveUser(values.name,values.emailId,values.userName,values.password)
    },
});
  const [user, setUser] = useState<IUserData>(initialUserState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = (name:string,emailId:string,userName:string,password:string) => {
    
    var data = {
        name: name,
        emailId: emailId,
        userName: userName,
        password:password
    };

    UserDataService.create(data)
      .then((response: any) => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          emailId: response.data.emailid,
          userName: response.data.username,
          password: response.data.password
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error) => {
       if(error.response.status==400){
         alert(error.response.data);
       }
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="AddUser" >
      {submitted ? (
        <div>
          <h4>User has been created successfully!</h4>
          <div>          
          <Link to={"/users"} className="nav-link">
              <button>View Users</button>
            </Link>
          </div>
         
        </div>
      ) : (

        <div>  
         <form onSubmit={formik.handleSubmit}>      
  <div className="form-row">
        <div className="form-group col-3" >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
           
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
          {formik.errors.name ? 
      <div className="myDiv">{formik.errors.name}</div> : null}
        </div>

        <div className="form-group col-3">
          <label htmlFor="emailId">Email Id</label>
          <input
            type="text"
            className="form-control"
            id="emailId"
            
            value={formik.values.emailId}
            onChange={formik.handleChange}
            name="emailId"
          />
          {formik.errors.emailId ? 
      <div className="myDiv">{formik.errors.emailId}</div> : null}
        </div>
        </div>
        <div className="form-group col-3">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            
            value={formik.values.userName}
            onChange={formik.handleChange}
            name="userName"
          />
          {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}
        </div>
        <div className="form-group col-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"            
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
           
          {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}
        </div>
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Register</span>
                </Button>
          
          
         </form>
        </div>
        
      )}
    </div>
  );
};

export default AddUser;