import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form } from "react-bootstrap"
import "./chat.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllMessages, sendMessage } from '../../redux/userAction'
import io from "socket.io-client"

const Chat = () => {
    const { users } = useSelector(state => state.allUserStore);
    const { user } = useSelector(state => state.userStore);
    const { messages } = useSelector(state => state.chatStore);

    const [chats, setChats] = useState([]); // all Chats
    const [userId, setUserId] = useState(""); // selected user's Id
    const [image, setImage] = useState(""); // selected user's image
    const [userName, setUserName] = useState(""); // selected user's userName
    const [text, setText] = useState(""); // entered text in message
    const [arriveMsg, setArriveMsg] = useState([]);

    const dispatch = useDispatch();
    const socket = io.connect("/"); // socket
    let msgId = 0;

    // select a user's chat
    const selectUser = (user) =>{
        setUserId(user._id);
        setUserName(user.userName)
        setImage(user.image.url);
    }

    // Send the message
    const handleMessage = () =>{
        let temp = text;
        setText("");
        const msgs = [...chats];
        msgs.push([temp, true, ++msgId]);
        setChats(msgs);

        dispatch(sendMessage(temp, userId));
        console.log('message sending ')
        socket.emit("send-msg", {message:temp, reciever:userId});
    }
    
    //  get all messages of the selected user...
    useEffect(() =>{
        if(userId){
            dispatch(getAllMessages(userId));
        }
    }, [userId])

    // select the default user at the beggining, the first one...
    useEffect(() =>{
        if(users){
            setImage(users[0].image.url);
            setUserName(users[0].userName);
            setUserId(users[0]._id);
        }
    }, [users]);

    //  set chats array when got messages..
    useEffect(() =>{
        let arr =[];
        
        messages && messages.forEach((msg) =>{
            let ch = [  // chats as an 2d array, [msg, sentByMe, id]
                msg.message,
                msg.sender.toString() === user._id.toString(),
                ++msgId
            ]
            arr.push(ch);
        })

        setChats(arr);
        console.log(chats);
    }, [messages]);

    //  connect the socket with the user...
    useEffect(() =>{
        if(user){
            // socket.current = io("http://localhost:5000")
            socket.emit("add-user", (user._id));
        }
    }, [user])

    useEffect(() =>{
        socket.on("reciever-msg", (msg) =>{
            setArriveMsg([msg, false, ++msgId]);
        })
        socket.on("connect_error", (err) =>{
            console.log(err);
        })
    },[socket]);

    useEffect(() =>{
        if(arriveMsg){
            setChats(prev => [...chats, arriveMsg]);
        }
    }, [arriveMsg])

    return (
        <>
            <Card className='chat-card'>
                <Card.Title>
                    !--Have Fun With Users--!
                    <div className="d-flex user align-items-center">
                        <img src={user.image.url} alt={`${user.userName}'s profile picture`} />
                        <h4>{user.userName}</h4>
                    </div>
                </Card.Title>

                <div className="d-flex main justify-content-around">
                    <div className="left-users">
                        {
                            users && users.map((us) =>(
                                us.userName == user.userName ? null :
                                <div className="d-flex user align-items-center" key={us._id}
                                onClick={() => selectUser(us)}
                                >
                                    <img src={us.image.url} alt={`${us.userName}'s profile picture`} />
                                    <h4>{us.userName}</h4>
                                </div>
                            ))
                        }
                    </div>
                    <div className="right-chat">
                        { (userName && image) ? 
                            <div className="d-flex user align-items-center">
                                <img src={image} alt={`${userName}'s profile picture`} />
                                <h4>{userName}</h4>
                            </div>
                        : null}

                        <div className="chats">
                            {/* {
                                !chats ? null : chats.map((chat) =>(
                                    <div className={chat[1] ? "chat-right" : "chat-left"} key={chat[2]}>
                                        <h6>{chat[0]}</h6>
                                    </div>
                                ))
                            } */}
                        </div>
                        <div className="send-box d-flex">
                            <Form.Control type='text' value={text} onChange={(e) => setText(e.target.value)}/>
                            <Button onClick={handleMessage} disabled={!text.trim()}>Send !</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Chat