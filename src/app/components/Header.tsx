import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'

const Header = () => {
  const [title, setTitle] = useState("...");
  useEffect(() => {
    ipcRenderer.send("getAppDetails");
    ipcRenderer.on("appDetailsSent", (event: any, data: any) => {
      setTitle(data.title)
    } )
  },
  [])
  return (
    <Navbar className='navbar'>
      <Container>
        <NavbarBrand className='whiteText'>
          {title}
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}

export default Header