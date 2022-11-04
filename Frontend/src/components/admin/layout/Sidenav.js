// import { useState } from "react";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const items = [
  // {
  //   label: (
  //     <NavLink to="/admin">
  //       <span className="label">Admin</span>
  //     </NavLink>
  //   ),
  //   key: "1",
  // },
  // {
  //   label: (
  //     <NavLink to="/admin/tables">
  //       <span className="label">Tables</span>
  //     </NavLink>
  //   ),
  //   key: "2",
  // },
  // {
  //   label: (
  //     <NavLink to="/admin/billing">
  //       <span className="label">Billing</span>
  //     </NavLink>
  //   ),
  //   key: "3",
  // },
  // {
  //   label: (
  //     <NavLink to="/admin/profile">
  //       <span className="label">Profile</span>
  //     </NavLink>
  //   ),
  //   key: "6",
  // },
  {
    label: (
      <NavLink to="/admin/manage-user">
        <span className="label">จัดการผู้ใช้</span>
      </NavLink>
    ),
    key: "7",
  },
  {
    label: (
      <NavLink to="/admin/addnews">
        <span className="label">เพิ่มข่าว</span>
      </NavLink>
    ),
    key: "8",
  },
  {
    label: (
      <NavLink to="/admin/manage-news">
        <span className="label">จัดการข่าว</span>
      </NavLink>
    ),
    key: "9",
  },
];

function Sidenav({ children }) {
  // const { pathname } = useLocation();
  // const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <Link to="/admin">
          <span style={{ color: "black" }}>SIMS Dashboard</span>
        </Link>
      </div>
      <hr />
      <Menu theme="light" mode="inline" items={items} />
    </>
  );
}

export default Sidenav;
