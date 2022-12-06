import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";


function withParams(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class CreateRoomPage extends React.Component  {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes
    }
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleRoomCreation = this.handleRoomCreation.bind(this);
  }

  handleVotesChange(e){
    this.setState({
      votesToSkip: e.target.value.match(/^[0-9]+$/) != null ? e.target.value : this.defaultVotes
    })
  }

  handleGuestCanPauseChange(e){
    this.setState({
      guestCanPause: e.target.value === 'true' ? true : false
    })
  }

  handleRoomCreation(){
    console.log('this.state')
    console.log(this.state)
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        guest_can_pause : "True", 
        votes_to_skip : this.state.votesToSkip, 
      })
    };
    fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.navigate('/room/'+ data.code));
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography  component={'span'}  variant="h4">
         
            Create a room

          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel value="true" 
                    control={<Radio color="primary"/>}
                    label = "Play/Pause" 
                    labelPlacement="bottom"/>
              <FormControlLabel value="false" 
                    control={<Radio color="secondary"/>}
                    label = "No control" 
                    labelPlacement="bottom"/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField required type ="number" 
                    defaultValue={this.defaultVotes}
                    onChange={this.handleVotesChange}
                    inputProps={{min: 1, style: {textAlign: "center"}}}/>
            <FormHelperText>
              <div>Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" className="main_button" variant="contained" onClick={this.handleRoomCreation}>Create a room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" className="main_button" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
      
    );
  }
}


export default withParams(CreateRoomPage);