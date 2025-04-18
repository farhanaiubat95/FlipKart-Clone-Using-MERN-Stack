import React from 'react'
import {useLocation} from 'react-router-dom'

// Component
import HomeSearch from './HomeSearch';
import OtherSearch from './OtherSearch';

const Search = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
        {isHomePage && <HomeSearch/>}
        {!isHomePage && <OtherSearch/>}
    </>
  )
}

export default Search
