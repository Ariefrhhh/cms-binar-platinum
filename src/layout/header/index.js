import React from "react";
import logo from "../../assets/images/Rectangle 62.png";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import Input from "../../component/input";

const Header = () => {
  return (
    <div>
      <div className="header d-flex gap-5 ps-5 pe-5">
        <div className="d-flex justify-content-center align-items-center">
          <img className="logo" src={logo} alt="logo" />
          <div className="d-flex ms-5">
            <Button className="btn-collapse" size="sm" outline>
              <i className="fa fa-bars"></i>
            </Button>
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
