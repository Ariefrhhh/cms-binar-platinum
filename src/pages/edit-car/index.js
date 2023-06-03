import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import "../../assets/CSS/editcar.css"



const Editcar= () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const [imageErrorNotif, setImageErrorNotif] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [carCreate, setCarCreate] = useState(null);

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  //form
  const initialValues = {
    nameInput: "",
    priceInput: 0,
    imageInput: null,
    categoryInput: "",
  };

  const [values, setValues] = useState(initialValues);

  //populate value on first render
  useEffect(() => {
    const urlAPI = "https://bootcamp-rent-cars.herokuapp.com";
    const config = {
      headers: {
        access_token: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    };
    axios
      .get(`${urlAPI}/admin/car/${location.state.carId}`, config)
      .then((res) => {
        const tempRes = res.data;
        setValues((values) => ({ ...values, nameInput: tempRes.name, priceInput: tempRes.price, categoryInput: tempRes.category }));
        setCarCreate(tempRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.carId]);
  //handle change
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
  };

  //handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.imageInput === null) {
      setImageStatus(true);
      setImageErrorNotif("Please Upload Image");
      return false;
    }
    if (values.imageInput !== null && values.imageInput.size > 2097152) {
      setImageStatus(true);
      setImageErrorNotif("Image File Size is Too Big");
      return false;
    }
    if (values.imageInput !== null) {
      var fname = values.imageInput.name;
      var re = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
      if (!re.exec(fname)) {
        setImageStatus(true);
        setImageErrorNotif("File type is not supported!");
        return false;
      }
    }

    const urlAPI = "https://bootcamp-rent-cars.herokuapp.com";
    const config = {
      headers: {
        access_token: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    };
    const data = new FormData();
    data.append("name", values.nameInput);
    data.append("category", values.categoryInput);
    data.append("price", values.priceInput);
    data.append("status", carCreate.status);
    data.append("image", values.imageInput);

    await axios
      .put(`${urlAPI}/admin/car/${location.state.carId}`, data, config)
      .then(async () => {
        navigate("/listcar", { state: { statusAdd: true } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let activeClassName = "menuItemActive";

  return (
    <div className="container-fluid">
    <div className="row">
      <Col className="col-lg-2 leftSidebar">
        <h2 className="pageTitle">CARS</h2>
        <NavLink to="#listcar" className={({ isActive }) => (isActive ? activeClassName : "menuItem")}>
          List Car
        </NavLink>
      </Col>
      <Col lg={10}>
    <div className="ms-1 ps-5 pt-5">
  <Breadcrumb>
    <BreadcrumbItem className="breadcrumbitemclick" onClick={()=>navigate("/listcar")}> 
        Cars     
    </BreadcrumbItem>
    <BreadcrumbItem className="breadcrumbitemclick" onClick={()=>navigate("/listcar")}>
        List Car    
    </BreadcrumbItem>
    <BreadcrumbItem active>
        Edit Car     
    </BreadcrumbItem>
  </Breadcrumb>
  </div>
  <div>
        <h1 className="p-5">Edit Car</h1>
    <Form className="ps-0" onSubmit={handleSubmit}>
        <FormGroup row>
          <Label md={2}>
          Nama/Tipe Mobil<sup className="star">*</sup>
          </Label>
          <Col md={10}>
          <Input  required type="input" name="nameInput" id="nameInput" className="datainput" placeholder="Input Nama/Tipe Mobil" value={values.nameInput || ""} onChange={handleInputChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>
          Harga<sup className="star">*</sup>
          </Label>
          <Col md={10}>
          <Input required type="number" min="0" name="priceInput" id="priceInput" className="datainput" placeholder="Input Harga Sewa Mobil" value={values.priceInput || 0} onChange={handleInputChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>
          Foto<sup className="star">*</sup>
          </Label>
          <Col md={10}>
          <Input  invalid={imageStatus} required type="file" name="imageInput" className="datainput" placeholder="Upload Foto Mobil" accept=".png, .jpg, .jpeg, .webp"  onClick={handleUploadClick} onChange={handleImageChange}/>
          </Col>
          <FormText id="imageUploadHelp" muted>
                File size max. 2MB
              </FormText>
              <FormFeedback type="invalid">{imageErrorNotif}</FormFeedback>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>
          Kategori<sup className="star">*</sup>
          </Label>
          <Col md={10}>
          <Input  required name="categoryInput" className="datainput" placeholder="Pilih Kategori Mobil" value={values.categoryInput || "placeholder"} onChange={handleInputChange}>
          <option value="placeholder">Pilih Kategori Mobil</option>
              <option value="small">Small</option>
              <option value="Medium">Medium</option>
              <option value="large">Large</option>
          </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
              <Label md={2}>
                UpdatedAt
              </Label>
              <Col md={10}>
             {carCreate !== null ? carCreate.updatedAt.substring(0, 10) : "-"}
              </Col>
            </FormGroup>
            <FormGroup row >
              <Label md={2}>
                CreatedAt
              </Label>
              <Col md={10}>
              <div>{carCreate !== null ? carCreate.createdAt.substring(0, 10) : "-"}</div>
              </Col>
            </FormGroup>
           <div className="pt-5">
            <div className="d-flex gap-3 ">
            <Button className="cancelButton" onClick={()=>navigate("/Listcar")} outline>
                Cancel
              </Button>
              <Button className="submitButton" htmlFor="formSubmit" tabIndex="0">
                Save
              </Button>
              </div>
              </div>
              </Form>
              </div>
              </Col>
      </div>
    </div>
  );
};

export default Editcar;
    
