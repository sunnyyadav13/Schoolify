import './App.css';
import io from 'socket.io-client'
import { useState, useEffect } from "react";
import Chat from './Chat'
import Card from 'react-bootstrap/Card'
import Grid from "@material-ui/core/Grid"
const socket = io.connect("https://anshu-chat-server.herokuapp.com");

function ClientApp() {
  const [username, setUserName] = useState("")
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)
  const [previousChatRoomList, setPreviousChatRoomList] = useState([])

  const getChatRoomList = async () => {
    try {
      const res = await fetch('/getChatRoomList', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setPreviousChatRoomList(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setUserName(localStorage.getItem('userName'))
    getChatRoomList()
    // eslint-disable-next-line
  }, [])

  const addRoomNameToUsersChatRoomList = async () => {
    await fetch("/addRoomNameToUsersChatRoomList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        roomName: room
      })
    })
  }

  const joinRoom = () => {
    console.log('Join room called with rooomName', room)
    if (username !== "" && room !== "") {
      const data = {
        room: room,
        name: username
      }
      socket.emit("join_room", data)
      setShowChat(true)
      addRoomNameToUsersChatRoomList()
    }
  }

  const openRoom = async (e) => {
    const roomName = e.target.innerHTML
    await setRoom(roomName)
    joinRoom()
  }

  const openRoomFromChat = async (roomName) => {
    await setRoom(roomName)
  }

  const askRoomNameToJoin = () => {
    return (
      <>
        <Grid container spacing={8}>


          <Grid item md={4}>
            <div className="showChatContainer" style={{ marginRight: '20rem', marginTop: '1rem', marginLeft: '2rem' }}>
              <Card style={{ width: '20rem' }}>
                <Card.Header>Your Community History</Card.Header>
                <Card.Body>
                  <div style={{ overflow: 'scroll', height: '30rem' }} >


                    <div className="list-group">
                      {previousChatRoomList.map((roomList, index) => {
                        return (
                          <button style={{ width: '15rem' }} type="button" key={index} className="list-group-item list-group-item-action todo-row" onClick={openRoom}>{roomList.roomName}</button>

                          //Other ways to do the same thing with ease
                          //<div className="keyboardRow roundBorder" value={"example"} onClick={e => this.handleInput(e, "value")} >
                          //handleInput(e) {
                          //   console.log(e.target.value);
                          //}
                        )
                      })}
                    </div>

                  </div>
                </Card.Body>
              </Card>



            </div>
          </Grid>



          <Grid item md={4}>
            <div style={{ marginTop: '4rem', marginLeft: '5rem' }} className="joinChatContainer" >

              <h5> Create or Join a new room </h5>

              <input type="text"
                placeholder="Romm ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />

              <button onClick={joinRoom}>Join a Room </button>
            </div>
          </Grid>


        </Grid>
      </>
    )
  }

  return (
    <div className="App">
      {!showChat ? askRoomNameToJoin() : (<Chat groups={previousChatRoomList} socket={socket} username={username} room={room} openRoomFromChat={openRoomFromChat} />)}
    </div>
  );
}

export default ClientApp;
