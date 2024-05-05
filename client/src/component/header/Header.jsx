import React from "react";
import {Navbar, Nav, Container, Offcanvas} from 'react-bootstrap'

import {AiFillHome, AiOutlineHome} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {BiSearchAlt} from "react-icons/bi";
import {RiAccountPinBoxLine, RiAccountPinBoxFill} from "react-icons/ri";
import { BsChatText, BsChatTextFill} from "react-icons/bs"
import { RiFeedbackFill, RiFeedbackLine} from "react-icons/ri"
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css"


const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    const expand = "sm";


    return <>
        <Navbar key='md' bg="dark" fixed='top' expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" onClick={()=>setTab("/")}>My CRUD</Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" onClick={()=>setTab("/")}>
                            <div className="d-flex">
                                {
                                    tab === "/" ?
                                    <AiFillHome className="icon"/> :
                                    <AiOutlineHome className="icon"/>
                                }
                                <h3 className="link-h">Home</h3>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/search"  onClick={()=>setTab("/search")}>
                            <div className="d-flex">
                                {
                                    tab === "/search" ?
                                    <FaSearch className="icon"/> :
                                    <BiSearchAlt className="icon"/>
                                }
                                <h3 className="link-h">Search</h3>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/chat"  onClick={()=>setTab("/chat")}>
                            <div className="d-flex">
                                {
                                    tab === "/chat" ?
                                    <BsChatTextFill className="icon"/> :
                                    <BsChatText className="icon"/>
                                }
                                <h3 className="link-h">Search</h3>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/feedback"  onClick={()=>setTab("/feedback")}>
                            <div className="d-flex">
                                {
                                    tab === "/feedback" ?
                                    <RiFeedbackFill className="icon"/> :
                                    <RiFeedbackLine className="icon"/>
                                }
                                <h3 className="link-h">Feedback</h3>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/account"  onClick={()=>setTab("/account")}>
                            <div className="d-flex">
                                {
                                    tab === "/account" ?
                                    <RiAccountPinBoxFill className="icon"/> :
                                    <RiAccountPinBoxLine className="icon"/>
                                }
                                <h3 className="link-h">Account</h3>
                            </div>
                        </Nav.Link>
                    </Nav>
                    </Offcanvas.Body>    
            </Navbar.Offcanvas>            
            </Container>
      </Navbar>
    </>
};

export default Header;
