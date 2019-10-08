import { useState } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom'

function Homepage () {
  return (
    <>
      <Header />
      <Link to="/createRepo"> Create Repo </Link>
    </>
  )
}

export default Homepage
