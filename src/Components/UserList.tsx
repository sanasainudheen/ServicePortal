import React, { useState, useEffect, ChangeEvent } from "react";
import UserDataService from "../Services/UserService";
import IUserData from '../types/User';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUserData>>([]);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response: any) => {
        setUsers(response.data);
       
      })
      .catch((e: Error) => {
       
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user: IUserData, index: number) => {
    setCurrentUser(user);   
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  

  return (
    <div className="userList">
      
      <div className="col-md-6">
        <h4>Registered Users....</h4>
      {users.length!=0 ?(                  
        <ul className="list-group">
            <p>Please click on a user to edit....</p>
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.name}
              </li>
            ))}
        </ul>
      ):(
          <div>No Users Found.  Please add a user...</div>
      )}
       
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentUser.name}
            </div>
            <div>
              <label>
                <strong>EmailId:</strong>
              </label>{" "}
              {currentUser.emailId}
            </div>
           

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
             <Button 
                
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Edit</span>
                </Button>
             
            </Link>
            <Link
              to={"/ServiceRequest/" + currentUser.id}
              className="badge badge-warning"
            >
            <Button 
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
               className="btn btn-primary btn-block" >
                
                 <span>Add Request</span>
               </Button>
            </Link>
          </div>
        ) : (
          <div>
            <br />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;