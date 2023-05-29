import React from "react";
import cmslogo from "../../assets/images/Rectangle 63.png"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/sidebar.css"



const SideBar = ()=> {  
  const Navigate = useNavigate()
    return (
    
    <Sidebar className="sidebar-nav">
    <div >
        <img className="cms-logo p-3" src={cmslogo} alt="logo"/>
    </div>
    <Menu>
            <SubMenu label="Dashboard">
      <MenuItem onClick={()=> Navigate ('/Home')}> Dashboard </MenuItem>
    </SubMenu>
    <SubMenu label="Cars">
    <MenuItem onClick={()=> Navigate ('/ListCar')}> List Car </MenuItem>
    </SubMenu>
  </Menu>
    </Sidebar>

    )
}

export default SideBar