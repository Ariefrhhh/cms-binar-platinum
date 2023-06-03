import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Dashboardpage.css";
import { Form, Button, FormGroup, Input, Breadcrumb, BreadcrumbItem } from "reactstrap";
import BarGraph from "../../component/bargraph";
import SectionTableComp from "../../component/SectionTableComp";


const Home = () => {
  const initialValues = {
    monthInput: null,
  };

  const [values, setValues] = useState(initialValues);
  const [dataReport, setDataReport] = useState(null);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(values.monthInput); cek isi value onChange
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlAPI = "https://bootcamp-rent-cars.herokuapp.com";
    const config = {
      headers: {
        access_token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };

    axios
      .get(
        `${urlAPI}/admin/order/reports?from=${values.monthInput}-01&until=${values.monthInput}-31`,
        config
      )
      .then(async (res) => {
        const tempReports = res.data;
        setDataReport(tempReports);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let activeClassName = "menuItemActive";
  return (
    <main id="pageDashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 leftSidebar">
            <h2 className="pageTitle">DASHBOARD</h2>
            <NavLink
              to="#dashboard"
              className={({ isActive }) =>
                isActive ? activeClassName : "menuItem"
              }
            >
              Dashboard
            </NavLink>
          </div>
          <div className="col-lg-10 rightContent">
          <div className="  pt-5">
  <Breadcrumb>
    <BreadcrumbItem> 
        Dashboard   
    </BreadcrumbItem>
    <BreadcrumbItem active>
        Dashboard    
    </BreadcrumbItem>
  </Breadcrumb>
  </div>
            <section id="sectionBarGraph">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="titleArea d-flex align-items-center">
                      <h3 className="titleText">
                        Rented Car Data Visualization
                      </h3>
                    </div>
                    <h5 className="formTitle">Month</h5>
                    <Form
                      id="monthFilterForm"
                      className="d-flex"
                      onSubmit={handleSubmit}
                    >
                      <FormGroup>
                        <Input
                          required
                          name="monthInput"
                          id="monthInput"
                          className="monthInput"
                          type="month"
                          as="input"
                          placeholder="Pilih Bulan"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <Button className="submitButton" type="submit">
                        Go
                      </Button>
                    </Form>
                    {dataReport ? (
                      <BarGraph dataReport={dataReport} />
                    ) : (
                      <h4 className="dataEmptyAlert">
                        Sorry, but the data is empty, Please select month report
                        to be displayed
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <SectionTableComp />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
