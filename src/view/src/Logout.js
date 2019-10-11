import { useState, useEffect } from 'react';
import React from 'react';
import Header from './Header.js';
import { Redirect, Link } from 'react-router-dom'

function Logout () {
  const logout = async () => {
    let res = await fetch('http://localhost:8080/logout')
    let resM = await res.json()
    console.log(resM)
  }
  useEffect( () => {
    logout()
  }, [])

  return <Redirect to={"/"} />

}

export default Logout
