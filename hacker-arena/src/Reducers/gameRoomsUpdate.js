const updateGameRooms = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_GAMEROOMS':
      // return Object.assign({}, state, { gameRooms: action.gameRooms });
      return Object.assign({}, state, { gameRooms: action.payload.gameRooms });
    default:
      return state;
  }
};

export default updateGameRooms;