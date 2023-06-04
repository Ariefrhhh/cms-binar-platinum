import React, { useEffect, useState } from "react";
import { Services } from "../../config/api-middleware";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Modal, ModalBody, Row } from "reactstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import modalDeleteImage from "../../assets/images/img-BeepBeep.png";
import "../../assets/CSS/listcar.css"
import Addnewnotification from "../../component/addnewnotification";



const Carlist = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const [addNewStatus, setAddNewStatus] = useState(false);
  const [filter, setFilter] = useState("");

  const handleFilter = (category) => {
    setFilter(category);
  };

  const filteredCarData = carData.filter((car) => {
    if (filter === "") {
      return true;
    } else {
      return car.category === filter; 
    }
  });



  useEffect(() => {
    if (location.state !== null) {
      if ("statusAdd" in location.state) {
        setAddNewStatus(location.state.statusAdd);
        setTimeout(() => {
          setAddNewStatus(false);
        }, 5000);
      }
    }
  }, [location.state]);

  useEffect(() => {
    Services()
      .get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/car", {
        headers: {
          access_token: localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((result) => {
        setCarData(result.data.cars);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteCar = (carId) => {
    setCarIdToDelete(carId);
    setShow(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await Services().delete(`https://bootcamp-rent-cars.herokuapp.com/admin/car/${carIdToDelete}`, {
        headers: {
          access_token: localStorage.getItem("ACCESS_TOKEN"),
        },
      });

      setCarData((prevCarData) => prevCarData.filter((car) => car.id !== carIdToDelete));
      setShow(false);
      setCarIdToDelete(null);
      navigate("/listcar", { state: { statusDelete: true } });
    } catch (error) {
      console.log(error);
    }
  };

  const formatNumber = (number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);

    let activeClassName = "menuItemActive";

  return (
    <div className="container-fluid">
    
      <div className="row">
      <Col lg={2} className="leftSidebar pt-5">
  <h2 className="pageTitle">CARS</h2>
         <NavLink to="#listcar" className={({ isActive }) => (isActive ? activeClassName : "menuItem")}>
            List Car
         </NavLink>
      </Col>
    <Col lg={10}>
  {addNewStatus ? (
    <div className="addNewToast">
      <Addnewnotification />
    </div>
  ) : null}

  <div className="ms-3 ps-5 pt-5">
    <Breadcrumb>
      <BreadcrumbItem> 
        Cars     
      </BreadcrumbItem>
      <BreadcrumbItem active>
        List Car      
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
  <div className="d-flex justify-content-between p-5">
    <h1 className="pagetitle ps-3">List Car</h1>
    <Button className="addnewbutton" onClick={() => navigate("/addnewcar")}>
      + Add New Car
    </Button>
  </div>
  <div className="ms-3 ps-5 d-flex gap-3 ">
    <Button
      className={`filter-button ${filter === "" ? "active" : ""}`}
      onClick={() => handleFilter("")}
    >
      All
    </Button>
    <Button
      className={`filter-button ${filter === "small" ? "active" : ""}`}
      onClick={() => handleFilter("small")}
    >
      2 - 4 Orang
    </Button>
    <Button
      className={`filter-button ${filter === "medium" ? "active" : ""}`}
      onClick={() => handleFilter("medium")}
    >
      4 - 6 Orang
    </Button>
    <Button
      className={`filter-button ${filter === "large" ? "active" : ""}`}
      onClick={() => handleFilter("large")}
    >
      6 - 8 Orang
    </Button>
  </div>

  <div className="container-fluid">
    <Row className="px-5">
      {filteredCarData.map((car, index) => (
        <Col key={index} md={4} className="ms-0 mx-0 py-3">
          <Card style={{ height: "100%" }}>
            <div className="card-image-car">
              <img className="img-fluid carimage" src={car.image} alt="pict-car" />
            </div>
            <CardBody className="ps-4 ">
              <CardTitle>
                <h5 className="titletext">{car.name}</h5>
              </CardTitle>
              <CardSubtitle className="pb-5">
                <p className="pt-1 bodytext">
                  {formatNumber(car.price)}/Hari
                </p>
                <div className="d-flex">
                  <i className="fa fa-users p-1 me-2"></i>
                  <p>{car.category}</p>
                </div>
                <div className="d-flex">
                  <i className="fa fa-clock-o p-1 me-2"></i>
                  <p>
                    Updated at{" "}
                    {new Date(car.updatedAt).getDate()}{" "}
                    {new Date(car.updatedAt).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(car.updatedAt).getFullYear()},{" "}
                    {new Date(car.updatedAt).toLocaleString("default", {
                      hour: "numeric",
                      minute: "numeric",
                      hourCycle: "h24",
                    })}
                  </p>
                </div>
              </CardSubtitle>
              <div className="d-flex gap-3 justify-content-center pb-4">
                <Button
                  className="deletebutton"
                  color="danger"
                  onClick={() => handleDeleteCar(car.id)}
                  outline
                > <i className="fa fa-trash fa-2xl pe-2"></i>
                  Delete
                </Button>
                <Button
                  className="editbutton"
                  onClick={() => navigate("/editcar", { state: { carId: car.id } })}
                  color="success"
                >
                  <i className="fa fa-pencil-square-o fa-2xl pe-2"></i>
                  Edit
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  </div>

  <Modal id="modalDelete" isOpen={show} toggle={handleClose} centered>
    <ModalBody>
      <figure className="d-flex justify-content-center">
        <img src={modalDeleteImage} className="img-fluid deleteModalImage" alt="Mobil Delete" />
      </figure>
      <h4 className="modalTitle">Menghapus Data Mobil</h4>
      <p className="modalDesc">
        Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
      </p>
      <div className="modalActionArea d-flex justify-content-center align-items-center gap-3">
        <Button className="yesButton" onClick={handleConfirmDelete}>
          Ya
        </Button>
        <Button className="noButton" onClick={handleClose} outline>
          Tidak
        </Button>
      </div>
    </ModalBody>
  </Modal>
</Col>
      </div>
    </div>
  );
};

export default Carlist;