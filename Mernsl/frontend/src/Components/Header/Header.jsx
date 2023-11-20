import React, { useState } from 'react';
import "./Header.css"
import { Link } from 'react-router-dom';

import {
    Home,
    Add,
    Search,
    AccountCircle,
    HomeOutlined,
    SearchOutlined,
    AddOutlined,
    AccountCircleOutlined,
} from "@mui/icons-material";


const Header = () => {
  const [tab , setTab] = useState(window.location.pathname );
  console.log(tab);

  return (
    <div className='header'>

        <Link to='/' onClick={() => setTab("/")}>
        { tab==="/" ? <Home/> : <HomeOutlined/> }
        </Link>

        <Link to='/search' onClick={() => setTab("/search")}>
        { tab==='/search' ? <Search/> : <SearchOutlined/> }
        </Link>

        <Link to='/add' onClick={() => setTab("/add")}>
        { tab==="/add" ? <Add/> : <AddOutlined/> }
        </Link>

        <Link to='/account' onClick={() => setTab("/account")}>
        { tab==="/account" ? <AccountCircle/> : <AccountCircleOutlined/>}
        </Link>

    </div>
  )
}

export default Header
