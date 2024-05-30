import React from 'react'
import MenuList from '../features/Menu-list/MenuList'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
function MenuPage() {
  return (
   <div>
      <Navbar>
        <MenuList></MenuList>
      </Navbar>
      <Footer></Footer>
   </div>
  )
}

export default MenuPage;