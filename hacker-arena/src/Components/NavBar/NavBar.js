import React, {Component} from 'react';
import $ from 'jquery';

import fire from '../../Firebase/firebase';

class NavBar extends Component {
  componentDidMount(){
    $(".navbar-nav li").on("click", function() {
      $(".navbar-nav li").removeClass("active");
      $(this).addClass("active");
    });
  }
  render() {
    let { navigate, currentUser } = this.props;
    let isAdmin = currentUser ? currentUser.adminStatus : null;
    let username = currentUser.email ? currentUser.email.split('@')[0] : 'null';
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav ml-auto mr-auto">
           <img className="HAlogo navbarLogo " alt="nav logo" src="/assets/HAlogo.png" onClick={ () => { navigate('/') }}/>
          
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/'); }}>
            Home </li>
            <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Classic'); }}>
            Classic </li>
            <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Pair'); }}>
          Pair Match </li>
          <li className="nav-item rightNav navbar-brand codeRunLobby" onClick={ () => { navigate('/CodeRunLobby'); }}>
          Code Run </li>
          <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Solo'); }}>
          Solo </li>
          {isAdmin ? 
            <div>
            <li 
              className="nav-item rightNav navbar-brand" 
              onClick={ () => navigate('/AddProblem')}
            >
            Add Problem </li>
            <li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/Random'); }}>
            Random </li>
            </div>
            :
            null
          }
          
          {/* <a href='/' className='leftNav nav-item navbar-brand'>Home</a>
          <a href='/About' className='leftNav nav-item navbar-brand'>About</a>
          <a href='/AddProblem' className='leftNav nav-item navbar-brand'>Add Problem</a>
          <a href='/CodeRunLobby' className='leftNav nav-item navbar-brand'>Code Run</a> */}
          {
            currentUser.email ? (
              <li
               id='logout'
                className="nav-item rightNav navbar-brand"
                onClick={
                  () =>  fire.auth().signOut().then(() => {
                    navigate('/');
                  })
                }
              >
                Log out
              </li>
            ) : null
          }
          {
            currentUser.email ? (
              <a href="" className="navbarProfile nav-item rightNav" style={{top: '-15px', right: '-15px'}} onClick={() => navigate('/User/' + username)}>
                Hi { username }! {' '}
                <img className="profile-photo corner-profile-pic"
                  src={currentUser.photoURL || 'https://static.pexels.com/photos/428339/pexels-photo-428339.jpeg'}
                  alt='profile'
                />
              </a>
            ) : null
          }
        </ul>
      </nav>
    );
  }
}

export default NavBar;


/*
<li className="nav-item rightNav navbar-brand" onClick={ () => { navigate('/About'); }}> About </li> 
<li className="navbarLogo nav-item leftNav navbar-brand" onClick={ () => { navigate('/'); }}>
<strong>Hacker Arena Logo Here</strong></li>
*/