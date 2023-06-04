import React, { useState } from "react";
import logo from "../../assets/images/Rectangle 62.png";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import Input from "../../component/input";
import "../../assets/CSS/header.css"
import iconDashboard from "../../assets/images/Group 2.png";
import iconCars from "../../assets/images/fi_truck.png";
import { NavLink } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";


const Header = () => {
 
  const [show,setShow] = useState(false);
  

  const handleShow = () => {
    setShow(true)};

  const handleClose = () => {
    setShow(false);
  };

  let activeClassName = " d-flex align-items-center nav-link active";

  const menuItem = [
    {
      path: "/dashboard",
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
    <div> 
      <div className="header d-flex gap-5 ps-5 pe-5">
        <div className="d-flex justify-content-center align-items-center">
          <img className="logo" src={logo} alt="logo" />
          <div className="d-flex ms-5">
            <Button className="btn-collapse open-button " outline onClick={handleShow} >
              <i className="fa fa-bars fa-1x"></i>
              </Button>
            <Offcanvas show={show} className="offcanvas">
              <div className="d-flex justify-content-between px-3">
              <Offcanvas.Header className="offcanvas-title ps-0">
                <h4>BCR Admin</h4>
              </Offcanvas.Header>
              <Button className="close-button"><i className="fa fa-times fa-1x"  onClick={handleClose}></i></Button>
              </div>
              <Offcanvas.Body> 
                 <ul className="navbar-nav">
            {menuItem?.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink to={item.path} className={({ isActive }) => (isActive ? activeClassName : "nav-link d-flex align-items-center ")}>
      
                  <div className="icon-image">
                    <img src={item.icon} className="img-fluid" alt="icon-sidebar"></img>
                  </div>
                  <div className="menu-title">
                    <p className="m-0 ps-4  ">{item.name}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul></Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
        <div className="d-flex align-items-center gap-5">
          <div className="d-flex">
            <Input className="search-input"></Input>
            <div>
              <Button
                className="search-btn text-center"
                color="primary"
                outline
              >
                Search
              </Button>
            </div>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Jhon Doe
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                onClick={() => {
                  localStorage.removeItem("ACCESS_TOKEN");
                  window.location.replace("/");
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    
    </div>
  );
};

export default Header;
