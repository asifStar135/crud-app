import './App.css';
import {Routes, Route} from "react-router-dom"
import Header from './component/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Home from './component/home/Home';
import Search from './component/search/Search';
import Feedback from './component/feedback/Feedback';
import Account from './component/account/Account';
import Register from './component/register/Register';
import Login from './component/login/Login';
import Update from './component/update/Update';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUser, loadUser } from './redux/userAction';
import SingleUser from './component/singleUser/SingleUser';
import Chat from './component/chat/Chat';

function App() {
	const dispatch = useDispatch();
	const {isAuthenticated} = useSelector(state => state.userStore);
	
	useEffect(() =>{
		dispatch(loadUser());
		dispatch(getAllUser());
	}, [dispatch])

	return (
		<>
			<Header/>
			<Routes>
				<Route path="/" element={isAuthenticated ? <Home/> : <Login/>}/>
				<Route path='/search' element={isAuthenticated ? <Search/> : <Login/>}/>
				<Route path='/feedback' element={isAuthenticated ? <Feedback/> : <Login/>}/>
				<Route path="/account" element={isAuthenticated ? <Account/> : <Login/>}/>
				<Route path='/register' element={<Register/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/update' element={isAuthenticated ? <Update/> : <Login/>}/>
				<Route path='/chat' element={isAuthenticated ? <Chat/> : <Login/>}/>
				<Route path="/:id" element={isAuthenticated ? <SingleUser/> : <Login/>}/>
			</Routes>
		</>
	);
}

export default App;
