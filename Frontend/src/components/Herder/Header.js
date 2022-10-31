import React from 'react'
import './Header.css'
import Navbar from './Navbar'
import Topnav from './Topnav'
import './Header.css'
import styled from 'styled-components'


function Header({ children }) {
  return (
    <>
      <Head>
      <Topnav/>
      {/* <Navbar/> */}
      </Head>
      {children}
    </>
  )
}

const Head = styled.div`
  display: flex;
  flex-direction: column;
  
`

export default Header