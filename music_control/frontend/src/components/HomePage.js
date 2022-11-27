import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  

  
export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<p>This is the HOME</p>}/>
          <Route exact path="/join" element={<RoomJoinPage/>}/>
          <Route exact path="/create" element={<CreateRoomPage/>} render={({ match }) => <CreateRoomPage/>} />
          <Route exact path="/room/:roomCode" element={<Room/>} render={({ match }) => <Room id={match.params.roomCode} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}