import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Button, Card } from 'react-bootstrap'
import "./account.css"
import {BsFillPersonLinesFill, BsFillCalendarCheckFill} from "react-icons/bs"
import {FaUserCheck} from "react-icons/fa"
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser, deleteUser } from '../../redux/userAction';
import { useEffect } from 'react';

const Account = () => {
    const {user, loading, message, error} = useSelector(state => state.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        if(window.confirm("Please confirm it")){
            dispatch(logoutUser());
        }
    }

    const handleDelete = ()=>{
        const password = window.prompt("Enter your password first...");
        if(!password) return;

        dispatch(deleteUser(password));
    }

    useEffect(()=>{
        if(message){
            alert(message);
            if(message === "user deleted...!"){
                navigate("/login");
            }
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
    })
    
    return (
        <>
            <Card className="account flex-row justify-content-around">
                <Card className="account-left align-items-center">
                    <img src={user.image.url} alt="Profile pic..." />
                    <div className="detail d-flex flex-column align-items-center">
                        <h2 className="name">{user.name}</h2>
                        <div className="userName d-flex align-items-center">
                            <FaUserCheck className='icon'/>
                            <h3>{user.userName}</h3>
                        </div>
                        <div className="date d-flex align-items-center">
                            <BsFillCalendarCheckFill className='icon'/>
                            <h3>{user.joinDate}</h3>
                        </div>
                        <div className="about d-flex align-items-center">
                            <BsFillPersonLinesFill className='icon'/>
                            <h3>About Me...</h3>
                        </div>
                        {
                            user.about ? <h6>{user.about}</h6> : <h6>---No ABOUT IS ADDED---</h6>
                        }
                    </div>
                </Card>

                <Card className="right text-center">
                    <h2>..Account Utilities..</h2>
                    <Button variant='primary' >
                        <NavLink style={{color:"white", textDecoration:"none", display:"block"}} to="/update">Update Profile</NavLink>
                    </Button>
                    <Button variant='secondary' disabled={loading} onClick={handleLogout}> Log Out !</Button>
                    <Button variant='danger' onClick={handleDelete}>Delete Account</Button>

                    <h4>This is the main section of this project. You can logout, update your profile ar directly delet this account. You cannot update your username..!</h4>
                </Card>
            </Card>
        </>
    )
}

export default Account