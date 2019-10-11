import { useState } from 'react';
import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom'

function Homepage () {
  return (
    <>
      <Header />
      <p> Collaborative development platform, Signup and Login to create repositories </p>
    </>
  )
}

export default Homepage
