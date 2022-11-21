import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
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
          <Route exact path="/create" element={<CreateRoomPage/>}/>

        </Routes>
      </BrowserRouter>
    );
  }
}