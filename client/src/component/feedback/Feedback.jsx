import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import "./feedback.css"
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"


const Feedback = ()=> {
    const {user} = useSelector(state => state.userStore);
    
    return (
        <>
            <Card className="feedback align-items-center">
                <h2 className='title'>Give a Feedback...</h2>
                <div className="user d-flex align-items-center">
                    <img src={user.image.url} alt="Profile picture.." />
                    <div className="name">{user.userName}</div>
                </div>
                <br />
                <Form action="https://formspree.io/f/xzbwqeqr"
                    method="POST">

                    <Form.Group className="mb-3 shadow-none" controlId="formBasic">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" defaultValue={user?.name} className='shadow-none' name='name' placeholder="Enter name..." required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" className='shadow-none' name='email' placeholder="Enter email..." required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTextArea">
                        <Form.Label>Write your Feedback here</Form.Label>
                        <Form.Control className='shadow-none' as="textarea" name='message' placeholder="Enter your message..." required/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <hr />
            </Card>
        </>
    )
}

export default Feedback