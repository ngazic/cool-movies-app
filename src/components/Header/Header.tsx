import React, { FormEvent, FunctionComponent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchItems } from "../../store/actions";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import Button from "./Button/Button";

const Header: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('tv');

  const location = useLocation();
  let hide = false;
  if (location.pathname === '/single') {
    hide = true;
  }
  const dispatch = useDispatch();

  const linkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const linkBasePaths = event.currentTarget.href.split('/');
    const link = linkBasePaths[linkBasePaths.length - 1]
    dispatch(getSearchItems(searchTerm))
  }

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
      setSearchTerm(searchTerm);
  }

  const btnClick = (e: FormEvent<HTMLButtonElement>) => {
    dispatch(getSearchItems(searchTerm))
  }
  return (<header style={{ display: (hide) ? 'none' : '' }}>
    <Navigation click={linkClick} />
    <Search change={changeHandler} />
    <Button click={btnClick} />
  </header>);
};

export default Header;
