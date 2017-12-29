import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import Home from './Components/Home';
import Classic from './Containers/Classic';
import GameRoom from './Containers/GameRoom';
import UserProfile from './Containers/UserProfile'
import SignUp from './Containers/SignUp'
import SpectatorRoom from './Containers/Spectator/SpectatorRoom';
// import Login from './Containers/Login'
import AddProblem from './Containers/AddProblem/AddProblem';
import CreateGameRoom from './Containers/CreateGameRoom';
import CodeRunSpectator from './Containers/Spectator/CodeRunSpectator';

import CodeRunLobby from './Containers/BoardGame/Lobby';
import CodeRunRoom from './Containers/BoardGame/Game/GameRoom';

import PairHome from './Containers/Pair/PairHome'
import PairCreateGameRoom from './Containers/Pair/PairCreateGameRoom';
import Random from './Components/Random.js'
import PairGameRoom from './Containers/Pair/PairGameRoom';

// import { checkIfUserIsAdminAsync } from './Helpers/authHelpers'

import Solo from './Containers/Solo/CreateSolo';
import SoloRoom from './Containers/Solo/SoloRoom';

import updateCurrentUser from './Actions/updateCurrentUser';

// To check Log in info
import fire from './Firebase/firebase';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './Reducers/index';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

let currentUser = store.getState().currentUser;

fire.auth().onAuthStateChanged(function(user) {
  let app = (
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        {
          (
            <Switch>
              <Route exact path="/AddProblem" render={() => (
                currentUser.username ? (
                  <AddProblem />
                ) : (
                  <Redirect to="/" />
                )
              )}/>
              <Route exact path="/Classic" render={() => (
                currentUser.username ? (
                  <Classic />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/CreateGameRoom" render={() => (
                currentUser.username ? (
                  <CreateGameRoom />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/User/:username" render={() => (
                currentUser.username ? (
                  <UserProfile />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/GameRoom/:roomId" render={() => (
                currentUser.username ? (
                  <GameRoom />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/Spectate/:roomId" render={() => (
                currentUser.username ? (
                  <SpectatorRoom />
                ) : ( 
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/CodeRunLobby" render={() => (
                currentUser.username ? (
                  <CodeRunLobby />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>
              <Route exact path="/CodeRun/:roomId" render={() => (
                currentUser.username ? (
                  <CodeRunRoom />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>

              <Route exact path="/Pair" render={() => (
                currentUser.username ? (
                  <PairHome />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>

              <Route exact path="/Pair/CreateGameRoom" render={() => (
                currentUser.username ? (
                  <PairCreateGameRoom />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>

              <Route exact path="/Pair/GameRoom/:roomId" render={() => (
                currentUser.username ? (
                  <PairGameRoom />
                  ) : (
                  <Redirect to="/" />      
                  )
                )}/>

              <Route exact path="/Solo" render={() => (
                currentUser.username ? (
                  <Solo />
                ) : (
                  <Redirect to="/" />      
                )
              )}/>

              <Route exact path="/Solo/GameRoom/:roomId" render={() => (
                currentUser.username ? (
                  <SoloRoom />
                  ) : (
                  <Redirect to="/" />      
                  )
                )}/>
              <Route exact path="/CodeRunSpectator/:roomId" render={() => (
                currentUser.username ? (
                  <CodeRunSpectator />
                  ) : (
                  <Redirect to="/" />      
                  )
                )}/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/SignUp" component={SignUp}/>
              <Route exact path="/Solo" component={Solo}/>
              <Route exact path="/Classic" component={Classic}/>
              <Route exact path="/Random" component={Random}/>
            </Switch>
          )
        }
      </App>
    </ConnectedRouter>
  </Provider>
  );

  if (user) {      
    user.adminStatus = false;
    user.username = fire.auth().currentUser.email.split('@')[0];

    user.updateProfile(user);
    store.dispatch(updateCurrentUser(user));
    currentUser = store.getState().currentUser;

    // render 
    ReactDOM.render(
      app,
      document.getElementById('root')
    );
  } else {
    user = {};
    store.dispatch(updateCurrentUser(user));
    currentUser = store.getState().currentUser;

    //rendering 
    ReactDOM.render(
      app,
      document.getElementById('root')
    );
  }
});