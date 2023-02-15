import React from 'react'
import { Card, Form, Button, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import "./register.css"
import {useDispatch, useSelector} from "react-redux"
import { useState } from 'react'
import { registerUser } from '../../redux/userAction'
import { useEffect } from 'react'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, error, message, loading} = useSelector(state => state.userStore);

    const [user, setuser] = useState({name:"", userName:"", password:"", about:""});
    const [image, setImage] = useState("");
    const [confirm, setConfirm] = useState("");
    let name, value;

    let handleInput = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setuser({...user, [name]:value});
    }
    
    const handleImage =(e)=>{
        const Reader = new FileReader();
        const file = e.target.files[0];

        Reader.readAsDataURL(file);
        Reader.onload =()=>{
            if(Reader.readyState === 2){
                setImage(Reader.result)
                console.log(Reader.result);
            }
        }
    }

    let handleRegister = (e)=>{
        e.preventDefault();
        if(confirm !== user.password){
            alert("please confirm your password...!");
        }
        else{
            dispatch(registerUser(user.name, user.userName, user.password, image, user.about));
        }
    }

    useEffect(() =>{
        if(message){
            alert(message);
            dispatch({
                type:"clearMessage"
            });
        }
        if(error){
            alert(error);
            dispatch({
                type:"clearError"
            });
        }
        if(isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated, message, error])

  return (
    <>
        <Card className="register">
            <h2>..Register Yourself..</h2>
            {
                image ? <img src={image} alt="new profile picture"/> : null
            }
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" type="file" accept='image/*' onChange={handleImage}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" name='name' value={user.name} type="text" placeholder="Enter your name..." required
                    onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" name='userName' value={user.userName} type="text" placeholder="Enter username..."
                    required onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" name='about' value={user.about} as="textarea" placeholder="Tell something about you..."
                    onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" name='password' type="password" value={user.password} placeholder="Enter password..."
                    onChange={handleInput} required />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" required type="password" value={confirm} placeholder="Confirm password..."
                    onChange={(e)=>setConfirm(e.target.value)} />
                </Form.Group>

                <Button onClick={handleRegister} disabled={loading}>
                    Register
                </Button>
            </Form>
            <Nav.Link as={NavLink} to="/login">already an user... Login now !</Nav.Link>
        </Card>
    </>
  )
}

export default Register