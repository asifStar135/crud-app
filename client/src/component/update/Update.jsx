import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Form, Button, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { updateUser } from '../../redux/userAction'
import "./update.css"

const Update = () => {

    const [user, setUser] = useState({
        name:"", 
        about:"", 
        password:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const {message, error} = useSelector(state => state.userStore);
    let name, value;

    const handleImage = (e)=>{
        const Reader = new FileReader();
        const file = e.target.files[0];

        Reader.readAsDataURL(file);
        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setImage(Reader.result)
            }
        }
    }

    const handleInput =(e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleUpdate = (e)=>{
        e.preventDefault();

        if(!user.name && !user.about && !user.password && !image){
            alert("Enter details to update !");
            return;
        }
        if(user.password && user.password !== confirmPass){
            alert("password doesn't match !");
            return;
        }

        dispatch(updateUser(user.name, user.about, user.password, image));
    }

    useEffect(() =>{
        if(message){
            alert(message);
            if(message === "account updated...!")
                navigate("/account");
            dispatch({
                type:"clearMessage"
            })
        }
        if(error){
            alert(error);
            dispatch({
                type:"clearError"
            })
        }
    },[error, message, dispatch]);

  return (
    <Card className="update">
            <h2>..Put details to update..</h2>
            <Form>
                {image ? <img src={image} alt="new profile picture"/> : null}
                <Form.Group className="mb-3 shadow-none" >
                    {
                        image ? null :<Form.Label>Put image to set profile</Form.Label>
                    }
                    <Form.Control className="shadow-none" type="file" accept='image/*'
                    onChange={handleImage}/>
                </Form.Group>

                <Form.Group className="mb-3 shadow-none" controlId="formBasic">
                    <Form.Label>Change Your Name</Form.Label>
                    <Form.Control type="text" className='shadow-none' name='name' value={user.name} placeholder="Enter new name..." 
                    onChange={handleInput}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Change your about</Form.Label>
                    <Form.Control className="shadow-none" name='about' value={user.about} as="textarea" placeholder="Enter your new about..."
                    onChange={handleInput}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Change your password</Form.Label>
                    <Form.Control className="shadow-none" name='password' value={user.password} type="password" placeholder="Enter new password..."
                    onChange={handleInput}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control className="shadow-none" type="password" placeholder="Confirm password..." 
                    onChange={(e)=>setConfirmPass(e.target.value)}/>
                </Form.Group>

                <Button varint="dark" type="submit" onClick={handleUpdate}>
                    Register
                </Button>
            </Form>
        </Card>
  )
}

export default Update