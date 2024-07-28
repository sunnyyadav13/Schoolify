import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
// import {useNavigate, NavLink} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Grid } from '@material-ui/core';

function Chat(props) {
// const navigate = useNavigate()
const {groups, socket, username, room, openRoomFromChat} = props
const [currentMessage, setCurrentMessage] = useState("");
const[messageList, setMessageList] = useState([]) ;
const[roomName, setRoomName] = useState(props.room)

const saveCurrentMessage = async(messageData) => {
    
    await fetch('/addChatToItsRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
}

const sendMessage = async() => {
    if ( currentMessage !== "") {
        const messageData = {
            room : roomName,
            author: username,
            message: currentMessage,
            time: 
            new Date(Date.now()).getHours() + 
            ":" + 
            new Date(Date.now()).getMinutes(),
        }
       
        await socket.emit("send_message", messageData) 
        // eslint-disable-next-line
        const { room, author, message, time } = messageData
        const messageForList = { author, message, time }
        setMessageList((list) => [...list, messageForList]) 

        setCurrentMessage ("");
        saveCurrentMessage(messageData)
    }
};

const getPreviousChats = async() => {
    const res = await fetch('/getChatsFromOneRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({room})
    })
    const data = await res.json()
    setMessageList(data)
}


useEffect(() => {
    getPreviousChats()
    // eslint-disable-next-line
},[roomName])

useEffect(() => {
    getPreviousChats()
    // eslint-disable-next-line
},[])

useEffect(() => {   
    socket.on("receive_message", (data) => {
        // eslint-disable-next-line
        const { room, author, message, time } = data
        const messageForList = { author, message, time }
        setMessageList((list) => [...list, messageForList]) ;
    })
},[socket]);

const openRoom = (e) => {
    const roomName2 = e.target.innerHTML
    setRoomName(roomName2)
    openRoomFromChat(roomName2)
}

    return (
        <>
        <Grid container spacing={8}>
        <Grid item md={4}>

        <Card style={{width:'20rem', marginLeft:'3rem',marginRight:'10rem', marginTop:'1rem'}}>
          <Card.Header>Your Community History</Card.Header>
  <Card.Body>
  <div style={{ overflow: 'scroll', height: '30rem' }} >
          
          
          <div className="list-group">
            {groups.map((roomList,index) => {
                    return (
                        <button style={{width:'15rem'}} type="button" key={index} className="list-group-item list-group-item-action todo-row" onClick={openRoom}>{roomList.roomName}</button>
    
                    
                    )
            })}
        </div>
       
        </div>
  </Card.Body>
</Card>
</Grid>

<Grid item md={4}>
        <div className="chat-window" style={{marginTop:'1rem'}}>

       
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* HEADER */}
            <div className="chat-header">   
            <p>{username}  Welcome to Live Chat</p>
            <p>Room Name : {room}</p>
            </div>

            <br/>
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* BODY */}
            <div className="chat-body">
            {/* <div style={{paddingLeft:'15rem', backgroundColor:'white'}}>{message}</div> */}
                <ScrollToBottom className="message-container">
            {messageList.map((messageContent,index) => {
                return (
                    <div className="message"  key={index} 
                    id={username === messageContent.author ? "you" : "other"}
                    >
                        <div> 
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
                </ScrollToBottom>
            </div>

            <br/>
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
{/* FOOTER */}
            <div className="chat-footer">
                <input type="text"
                    placeholder="Hey..."
                    value={currentMessage}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value) ;
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}> &#9658; </button>
            </div>
        </div>
        </Grid>
        {/* </div> */}
        </Grid>
        </>
    )
}

export default Chat ;