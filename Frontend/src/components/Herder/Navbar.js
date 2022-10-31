import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navlink'>
      <ul className='nav_wrapper'>
        <li>
          <Link to='/'>หน้าแรก</Link>
        </li>
        <li>
          <Link to='/news'>ข่าวอัปเดต</Link>
        </li>
        <li>
          <Link to='/download'>ดาวน์โหลด</Link>
        </li>
        <li>
          <Link to='/'>ช่วยเหลือ</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar