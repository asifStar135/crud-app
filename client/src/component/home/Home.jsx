import React, { useState } from 'react'
import { useEffect } from 'react';
import {Card} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser} from '../../redux/userAction';
import "./home.css"
import Loader from "../loader/Loader"

const Home = () => {

    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");
    const hr = new Date(Date.now()).getHours();
    const {users, message, error, loading:allUserLoading} = useSelector(state => state.allUserStore)
    const {loading} = useSelector(state => state.userStore);
    console.log(users);

    useEffect(() =>{
        if(hr >= 4 && hr < 12){
            setMsg("Good Morning")}
        else if(hr >= 12 && hr < 18){
            setMsg("Good Afternoon")}
        else if(hr >= 18 && hr < 22) {setMsg("Good Evening")}
        else {setMsg("Good Night")}
        dispatch(getAllUser());
    },[hr, dispatch]);

    useEffect(()=>{
        if(message){
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
    }, [error, message])

  return (
    <>
    {
        (loading || allUserLoading) ? <Loader/> :
        <Card className='main-card flex-row justify-content-around'>
            <div className="left">
                <div className="top">
                    <h3>All users are here....</h3>
                </div>
                <div className="users">
                    {
                        users && users.map((el)=>(
                            <div key={el._id} className="user d-flex align-items-center">
                                <img src={el.image.url} alt="Profile picture.." />
                                <NavLink to={`/${el._id}`} className="name">
                                    {el.userName}
                                </NavLink>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="right">
                <div className="descr">
                    <h2>Hello there, {msg}!</h2>
                    <h5>
                        This is a simple Create-Read-Update-Delete project using MERN stack web tech...
                        <br />
                        I asifstar@135, made this project as a basic full stack application.. If you like it or have any suggetions about please send a feedback...🙂 <br />
                        Peace out...
                        <hr />
                    </h5>
                </div>
                <img className='crud-img' src="https://www.atatus.com/glossary/content/images/size/w960/2021/07/CRUD.jpeg" alt="" />
            </div>
        </Card>
    }
    </>
  )
}

export default Home;