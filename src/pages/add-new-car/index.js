import React, { useState } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import "../../assets/CSS/addnewcar.css"



const AddNewCarForm = () => {
  const navigate = useNavigate();
  const [nameInputStatus, setNameInputStatus] = useState(false);
  const [priceInputStatus, setPriceInputStatus] = useState(false);
  const [categoryInputStatus, setCategoryInputStatus] = useState(false);
  const [imageErrorNotif, setImageErrorNotif] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  var errorFound = false;

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const initialValues = {
    nameInput: "",
    priceInput: 0,
    imageInput: null,
    categoryInput: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    errorFound = false;

    //validasi input text&price&select
    if (values.nameInput === "") {
      setNameInputStatus(true);
      errorFound = true;
    } else {
      setNameInputStatus(false);
    }

    if (values.priceInput === 0) {
      setPriceInputStatus(true);
      errorFound = true;
    } else {
      setPriceInputStatus(false);
    }

    if (values.categoryInput === "" || values.categoryInput === "placeholder") {
      setCategoryInputStatus(true);
      errorFound = true;
    } else {
      setCategoryInputStatus(false);
    }

    //validasi Image kosong,size,filetype
    if (values.imageInput === null) {
      setImageStatus(true);
      setImageErrorNotif("Please Upload Image");
      errorFound = true;
    }
    if (values.imageInput !== null && values.imageInput.size > 2097152) {
      setImageStatus(true);
      setImageErrorNotif("Image File Size is Too Big");
      errorFound = true;
    }
    if (values.imageInput !== null) {
      var fname = values.imageInput.name;
      var re = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
      if (!re.exec(fname)) {
        setImageStatus(true);
        setImageErrorNotif("File type is not sup ported!");
        errorFound = true;
      }
    }

    if (errorFound === true) {
      return false;
    }

    const urlAPI = "https://bootcamp-rent-cars.herokuapp.com";
    const config = {
      headers: {
        access_token: `${localStorage.getItem("ACCESS_TOKEN")}`
      },
    };
    const data = new FormData();
    data.append("name", values.nameInput);
    data.append("category", values.categoryInput);
    data.append("price", values.priceInput);
    data.append("status", false);
    data.append("image", values.imageInput);

    await axios
      .post(`${urlAPI}/admin/car`, data, config)
      .then(async () => {
        navigate("/listcar", { state: { statusAdd: true } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
    <div className="ps-5">
        <h1 className="p-5">Add New Car</h1>
    <Form className="ps-5" onSubmit={handleSubmit}>
          <FormGroup row>
            <Label className="labeltext" md={2}>
              Nama/Tipe Mobil<sup className="star">*</sup >
            </Label>
            <Col md={10}>
            <Input required type="input" name="nameInput" id="nameInput" className="datainput" placeholder="Input Nama/Tipe Mobil" invalid={nameInputStatus} onChange={handleInputChange}></Input>
              </Col>
          </FormGroup >
          <FormGroup row>
            <Label className="labeltext" md={2}>
            Harga<sup className="star">*</sup >
            </Label>
            <Col md={10}>
            <Input  required type="number" min="0" name="priceInput" id="priceinput" className="datainput" placeholder="Input Harga Sewa Mobil" invalid={priceInputStatus} onChange={handleInputChange}/>
            <FormFeedback type="invalid">Silahkan isi Harga!</FormFeedback>
            </Col>
            </FormGroup >
            <FormGroup row>
            <Label className="labeltext" md={2}>
            Foto<sup className="star">*</sup >
            </Label>
            <Col md={10}>
            <Input  required type="file" name="imageInput" id="imageInput" className="datainput" placeholder="Upload Foto Mobil" invalid={imageStatus} accept=".png, .jpg, .jpeg, .webp"  onClick={handleUploadClick} onChange={handleImageChange}/>
              {/* <Button type="button" className="fileInputFake d-flex justify-content-between align-items-center" onClick={handleUploadClick}>
                <p>{values.imageInput ? values.imageInput.name : "Upload Foto Mobil"}</p>
              </Button> */}
              <FormText muted>
                File size max. 2MB
              </FormText>
              <FormFeedback type="invalid">{imageErrorNotif}</FormFeedback>
            </Col>
            </FormGroup >
            <FormGroup row>
            <Label className="labeltext" md={2}>
            Kategori<sup className="star">*</sup >
            </Label>
            <Col md={10}>
            <Input invalid={categoryInputStatus} type="select" required name="categoryInput" id="categoryInput" className="datainput" placeholder="Pilih Kategori Mobil" onChange={handleInputChange}>
                <option value="placeholder" disabled>Pilih Kategori Mobil</option>
                <option value="small">Small</option>
                <option value="Medium">Medium</option>
                <option value="large">Large</option>
            </Input>
            <FormFeedback type="invalid">Silahkan pilih kategori!</FormFeedback>
            </Col>
            </FormGroup >
            <FormGroup row>
              <Label className="labeltext" md={2}>
                UpdatedAt
              </Label>
              <Col md={10}>
                -
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label className="labeltext" md={2}>
                CreatedAt
              </Label>
              <Col md={10}>
                -
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
        </div>
          );
        };
        
       

export default AddNewCarForm;
