import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header () {
  return (
    <nav> 
      <a href="/"> GitLub </a>
      <Link to="/signup"> Sign Up </Link>
    </nav>
  )
}


export default Header
