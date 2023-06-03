import React from "react";
import cmslogo from "../../assets/images/Rectangle 63.png"
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from "react-router-dom";
import "../../assets/CSS/sidebar.css"
import iconDashboard from "../../assets/images/Group 2.png";
import iconCars from "../../assets/images/fi_truck.png";



const SideBar = () => {  
  let activeClassName = "active-menu";
  const menuItem = [
    {
      path: "/home",
      name: "Dashboard",
      icon: iconDashboard,
    },
    {
      path: "/listcar",
      name: "Cars",
      icon: iconCars,
    },
  ];

  return (
   
      <div className="container-fluid sidebar-nav">
        <div className="row">
          <div className="col d-flex flex-column align-items-center left-side">
            <div ><img className="pb-4" src={cmslogo} alt="logo"/></div>
            {menuItem?.map((item, index) => (
              <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? activeClassName : "sidebar-link")}>
                <div className="icon-image text-center">
                  <img src={item.icon} className="img-fluid" alt="icon-sidebar"></img>
                </div>
                <div className="menu-title text-center">
                  <p>{item.name}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
  );
};
export default SideBar