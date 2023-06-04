import React, { useState } from "react";
import bglogin from "../../assets/images/image 2.png"
import Form from "../../component/form";
import { Button, Col, Row } from "reactstrap";
import Input from "../../component/input";
import { Services } from "../../config/api-middleware";


const Login = () => 

{ 
    const [state, setState ] = useState ({
    email:"",
    password:""
})
    const handleChange = (e) => { 
        const {name,value}= e.target
        setState(previousState=> ({
            ...previousState,[name]: value
        }))
    }
    const handleSubmit=(e) => {
        e.preventDefault()
        Services().post('https://bootcamp-rent-cars.herokuapp.com/admin/auth/login', { ...state }).then(response => {
            localStorage.setItem("ACCESS_TOKEN", response?.data?.access_token)
            window.location.replace('/dashboard')
            console.log(response)
        }).catch(err => console.log(err.response.data.message))
    }

   return (
    <div className="d-flex">     
        <div>
            <img className="img-stretch" src={bglogin} alt="bglogin"/>
        </div>
        
        <div className="d-flex justify-content-center flex-column px-5 ">
        <Col md={8}>
        <h2>Welcome, Admin BCR</h2>
        </Col>
            <Form onSubmit={handleSubmit}>
                <Row className="gap-4">
                    <Col md={10}>
                        <Input onChange={handleChange} className="form-control" name="email" label={"Email"} required placeholder="Input Email"/>

                    </Col>
                    <Col md={10}>
                        <Input onChange={handleChange} className="form-control" name="password" label={"Password"} required type="password" placeholder="input Password"/>
                    </Col>
                    <Col md={10}>
                    <Button type='submit' className='w-100' style={{ backgroundColor: "#0D28A6" }}>Sign In</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
    )
}

export default Login