import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import SignIn from "../../Components/SignIn";

export default function Topbar() {


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">E-Services</span>
        </div>
       
      </div>
    </div>
  );
}
