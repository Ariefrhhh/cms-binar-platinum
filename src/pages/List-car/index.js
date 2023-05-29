import React, { useEffect, useState } from "react";
import { Services } from "../../config/api-middleware";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Modal, ModalBody, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import modalDeleteImage from "../../assets/images/img-BeepBeep.png";

const Carlist = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);

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

  return (
    <div className="listcar">
      <div className="d-flex justify-content-between p-5">
        <h5>List Car</h5>
        <Button style={{ backgroundColor: "#0D28A6" }} onClick={() => navigate("/addnewcar")}>
          + Add New Car
        </Button>
        <Button onClick={() => navigate("/tes")}>TES</Button>
      </div>
      <div className="container-fluid">
        <Row className="px-5">
          {carData.map((car, index) => (
            <Col key={index} md={4} className="ms-0 mx-0 py-3">
              <Card style={{ height: "100%" }}>
                <div className="card-image-car">
                  <img className="img-fluid" src={car.image} alt="pict-car" />
                </div>
                <CardBody>
                  <CardTitle>
                    <h5>{car.name}</h5>
                  </CardTitle>
                  <CardSubtitle>
                    <h6 className="p-1">
                      {formatNumber(car.price)}/Hari
                    </h6>
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
                      className="cardbutton"
                      color="danger"
                      onClick={() => handleDeleteCar(car.id)}
                      outline
                    >
                      Delete
                    </Button>
                    <Button
                      className="cardbutton"
                      onClick={() => navigate("/editcar", { state: { carId: car.id } })}
                      color="success"
                    >
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
    </div>
  );
};

export default Carlist;