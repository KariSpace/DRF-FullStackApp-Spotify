import React, { Component } from "react";
import { useParams } from "react-router-dom";
  

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false
    };
    this.roomCode = this.props.params.roomCode
    this.getRoomDetails();
    console.log(this.props)

  }
  getRoomDetails(){
    fetch('/api/get-room?code=' + this.roomCode)
    .then((responce) => responce.json())
    .then((data) => {
        this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host
        });
    });
  }
  render() {
    console.log(this.props)
    return ( <div> 
        <h3>{this.roomCode}</h3>
        <p>Votes: {this.state.votesToSkip}</p>
        <p>Guest Can Pause: {String(this.state.guestCanPause)}</p>
        <p>Host: {String(this.state.isHost)}</p>
    </div>);
  }
}


export default withParams(Room);