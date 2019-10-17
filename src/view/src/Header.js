import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header (props) {
  console.log(props)
  if (!props.loggedIn)
    return (
      <nav> 
        <a href="/"> GitLub </a> |
        <Link to="/signup"> Sign Up </Link> |
        <Link to="/login"> Log In </Link> |
        <Link to="/logout"> Log Out </Link>
      </nav>
    )
  else return (
    <nav> 
      <a href="/"> GitLub </a> |
      {props.userName}
      <Link to="/logout"> Log Out </Link>
    </nav>
  )
}


export default Header
