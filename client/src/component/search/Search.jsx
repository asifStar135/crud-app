import React, { useState } from "react";
import { Card} from "react-bootstrap";
import "./search.css"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import {getAllUser} from '../../redux/userAction';
import { NavLink } from "react-router-dom";

const Search = () => {
    const arr = [1,1,,11,1,1,1,1,1,1,1];
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.allUserStore);
    const [input, setInput] = useState();
    
    const [allUser, setAllUser] = useState([]);

    useEffect(() =>{
        async function getUsers(){
            await dispatch(getAllUser());
        }

        getUsers();

        if(users){
            let curr = [];
            users.filter((el)=>{
                if(input != "" && el.userName.includes(input)){
                    curr.push(el);
                }
            })
            setAllUser(curr);
            console.log(allUser);
        }
    }, [dispatch, input]);


    return <>
        <Card className="search">
        <h2 className='title'>Search User...</h2>
            <br />
            <form >
                <input type="text" name="name" placeholder='Enter userName..' required
                onChange={(e)=>setInput(e.target.value)} />
                <br />
            </form>
            <hr />

            <div className="search_users users d-flex align-items-center flex-column">
                {
                    allUser.length ? allUser.map((el) =>(
                        <div className="user d-flex align-items-center">
                            <img src={el?.image?.url} alt="Profile picture.." />
                            <NavLink to={`/${el._id}`} className="name">{el?.userName}</NavLink>
                        </div>
                    )) : <h3>No Users found...!</h3>
                }
            </div>    
            <hr />
        </Card>
    </>;
};

export default Search;
