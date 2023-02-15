import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card, Form, Button, Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import "./login.css"
import { loginUser } from '../../redux/userAction'


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const {isAuthenticated, error, message, loading} = useSelector(state => state.userStore);

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(loginUser(userName, password));
    }

    useEffect(() =>{
        if(error){
            alert(error);
            dispatch({
                type:"clearError"
            })
        }
        if(message){
            alert(message);
            dispatch({
                type:"clearMessage"
            });
        }

        if(isAuthenticated){
            navigate("/");
        }
    },[isAuthenticated, message, error])

  return (
    <>
        <Card className="login">
            <h2>..Log in to your account..</h2>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" value={userName} name="userName" type="text" placeholder="Enter username..."
                    onChange={(e)=>setUserName(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control className="shadow-none" value={password} type="password" placeholder="Enter password..."
                    onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>

                <Button varint="dark" type="submit" onClick={handleLogin} disabled={loading}>
                    Login
                </Button>
            </Form>
            <Nav.Link as={NavLink} to="/register">don't have account.. Register now !</Nav.Link>
        </Card>
    </>
  )
}

export default Login