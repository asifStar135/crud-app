import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Button, Card } from 'react-bootstrap'
import "./singleUser.css"
import {BsFillPersonLinesFill, BsFillCalendarCheckFill} from "react-icons/bs"
import {FaUserCheck} from "react-icons/fa"
import { useEffect } from 'react';
import {useParams} from "react-router-dom"
import { singleUser } from '../../redux/userAction';
import Loader from '../loader/Loader';


const SingleUser = () => {
    const dispatch = useDispatch();
    const params = useParams();
   
    const {user, loading} = useSelector(state => state.singleUserStore);

    useEffect(() =>{
        dispatch(singleUser(params.id));
    }, [dispatch, params.id]);

  return loading ? <Loader/> : (
    <>
        <Card className="single justify-content-around align-items-center">
            <img src={user?.image?.url} alt="Profile pic..." />
            <div className="detail d-flex flex-column align-items-center">
                <hr/>
                <h2 className="name">{user?.name}</h2>
                <hr/>
                <div className="userName d-flex align-items-center">
                    <FaUserCheck className='icon'/>
                    <h3>{user?.userName}</h3>
                </div>
                <div className="date d-flex align-items-center">
                    <BsFillCalendarCheckFill className='icon'/>
                    <h3>{user?.joinDate}</h3>
                </div>
            </div>
            <div className="about align-items-center">
                <div className='d-flex justify-content-center'>
                <BsFillPersonLinesFill className='icon'/>
                <h3>About Me...</h3>
                </div>
                {
                    user?.about ? <h6>{user.about}</h6> : <h6>---No ABOUT IS ADDED---</h6>
                }
            </div>
        </Card>
    </>
  )
}

export default SingleUser