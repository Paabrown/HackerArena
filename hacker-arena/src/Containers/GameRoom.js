import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import fire from '../Firebase/firebase';

import CodeEditor from '../Components/CodeEditor/CodeEditor.js'; //From Simon
import TestSuite from '../Components/TestSuite.js'; //From Simon
import ProgressBar from '../Components/GameRoom/ProgressBar';
import GameRoomLoading from '../Components/GameRoom/GameRoomLoading';
import WaitingForPlayer from '../Components/GameRoom/WaitingForPlayer';
import GameRoomError from '../Components/GameRoom/GameRoomError';

import '../Styles/GameRoom.css';

class GameRoom extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      allowEnter: true
    }
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  
  componentDidMount () {
    window.addEventListener('beforeunload', this.handleLeave);
    this.handleEnter();
  }

  componentWillUpdate() {
    this.handleEnter();
  }

  componentWillUnmount () {
    this.handleLeave();
    // window.removeEventListener('beforeunload', this.handleLeave);
  }

  handleLeave () {
    // handles leaving the gameroom should only be called when gameRooms 
    // has been retrieved from Firebase, the room exists, and you are a member
    if (this.props.gameRooms 
        && this.props.gameRooms[this.props.roomId] 
        && this.props.gameRooms[this.props.roomId].players
        && Object.keys(this.props.gameRooms[this.props.roomId].players).includes(this.props.username)) {
      let { gameRooms, roomId, username } = this.props;
      let room = gameRooms[roomId];
      // when you're the last player inside, leaving deletes the gameroom
      if (room.players.length <= 1) {
        fire.database().ref(`/rooms/${roomId}`).remove();
      } else {
        let gameRoom = Object.assign({}, room);
        // otherwise, just remove the user from the players array
        delete gameRoom.players[username];
        // don't allow handle enter to run again 
        this.setState({ allowEnter: false });
        fire.database().ref(`/rooms/${roomId}`).set(gameRoom);
      }
    } 
  }

  handleEnter() {
    // handles entering the gameroom: should only be called when gameRooms
    // has been retrieved from Firebase and the room you are in exists 
    // TODO and that game room is open for you to join
    if (this.props.gameRooms && this.props.gameRooms[this.props.roomId] && this.state.allowEnter) {
      let { gameRooms, roomId, username, navigate } = this.props;
      let room = gameRooms[roomId];
      // if the players array is undefined (you're creating the room) set it to an empty array
      let players = room.players || {};
      if (!room.players) room.players = {};
      let playerNames = Object.keys(players);
      // if you're already in the game room, do nothing
      if (playerNames.includes(username)) {
        return;
      } else if (playerNames.length === room.playerCapacity) {
        // if the gameRoom is full or closed, redirect the user to spectate the game
        navigate(`/Spectate/${roomId}`);
      } else {
        // the game room is open and user want to join, add user to room in db
        let gameRoom = Object.assign({}, room);
        // if you're the first one in, start the game timer
        if (playerNames.length === 0) {
          gameRoom.timerStarted = true;
          gameRoom.timeStart = performance.now();
        } 
        // add you username to the gameroom
        gameRoom.players[username] = {
          disruptions: [''],
          testStatus: {},
          credits: room.startingCredits || 0,
          liveInput: ''
        };
        // and update the database
        fire.database().ref(`/rooms/${roomId}`).set(gameRoom);
      }
      // TODO if you are the last user joining, change the gameroom status to 'closed'
    }
  } 
  
  render () {
    // show loading screen while waiting for gameRooms from Firebase (no obj or empty obj)
    // TODO if there are no game rooms, this message will always show until one is created
    // after retrieving gamerooms from firebase, if this room is not in that obj, let the user know
    if (this.props.gameRooms 
        && Object.keys(this.props.gameRooms).length 
        && !this.props.gameRooms[this.props.roomId]) return (<GameRoomError errorMessage="This Game Room No Longer Exists!" />);
    // If we have retrieved gameRooms from firebase and our room exists
    if (!this.props.gameRooms 
        || !Object.keys(this.props.gameRooms).length 
        || !this.props.gameRooms[this.props.roomId]
        || !this.props.gameRooms[this.props.roomId].players
        || !this.props.gameRooms[this.props.roomId].players[this.props.username]) return (<GameRoomLoading />);
    let { gameRooms, roomId } = this.props;
    let room = gameRooms[roomId];
    let { players, playerCapacity } = room;
    // find number of players currently in the room
    let numPlayers = Object.keys(players).length;
    // check that against the capacity established when the room was created
    let roomIsFull = numPlayers === Number(playerCapacity);
    if (!roomIsFull) return (<div className="completeWaiting" ><WaitingForPlayer /></div>);
    return (
      <div>
          <ProgressBar room={ room }/>
        <div id="editorAndTestSuite">
          <CodeEditor currentRoom={room}/>
          <TestSuite currentRoom={ room }/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  roomId: state.router.location.pathname.split('/')[2],
  username: fire.auth().currentUser.email.split('@')[0],
  gameRooms: state.gameRooms
});

const mapDispatcherToProps = (dispatch) => ({
  navigate: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatcherToProps)(GameRoom);