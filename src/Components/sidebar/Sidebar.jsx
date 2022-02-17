import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
         
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/AddUser" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Register
              </li>
            </Link>
            <Link to="/ServiceRequest" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Request a Service
              </li>
              </Link>
              <Link to="/RequestList" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Service Requests
              </li>
              </Link>
             
              <Link to="/SignOut" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Logout
              </li>
              </Link>
             
           
           
          
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
           
           
          </ul>
        </div>
      
      </div>
    </div>
  );
}
