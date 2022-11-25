import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {AiFillHome, AiOutlineHome} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {BiSearchAlt} from "react-icons/bi";
import {RiAccountPinBoxLine, RiAccountPinBoxFill} from "react-icons/ri";
import {BsFillChatSquareTextFill, BsChatSquareText} from "react-icons/bs"
import { useState } from "react";
import { NavLink } from "react-router-dom";


const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    return <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/" onClick={()=>setTab("/")}>My CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" onClick={()=>setTab("/")}>
                {
                    tab === "/" ?
                    <AiFillHome className="icon"/> :
                    <AiOutlineHome className="icon"/>
                }
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search"  onClick={()=>setTab("/search")}>
            {
                    tab === "/search" ?
                    <FaSearch className="icon"/> :
                    <BiSearchAlt className="icon"/>
                }
            </Nav.Link>
            <Nav.Link as={NavLink} to="/feedback"  onClick={()=>setTab("/feedback")}>
                {
                    tab === "/feedback" ?
                    <BsFillChatSquareTextFill className="icon"/> :
                    <BsChatSquareText className="icon"/> 
                }
            </Nav.Link>
            <Nav.Link as={NavLink} to="/account"  onClick={()=>setTab("/account")}>
                {
                    tab === "/account" ?
                    <RiAccountPinBoxFill className="icon"/> :
                    <RiAccountPinBoxLine className="icon"/> 
                }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
};

export default Header;
