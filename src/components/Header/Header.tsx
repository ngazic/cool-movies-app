import React, {FormEvent, FunctionComponent, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {getSearchItems} from "../../store/actions";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import { Button } from "antd";

const Header: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  let hide = false;
  if (location.pathname === "/single") {
    hide = true;
  }
  const dispatch = useDispatch();

  const changeHandler = (e : FormEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
    setSearchTerm(searchTerm);
  };

  const btnClick = () => {
    if (searchTerm.length > 2) {
      dispatch(getSearchItems(searchTerm));
    } else {
      alert("You must enter at least 3 letters!!!");
    }
  };
  return (<header style={{
      display: hide
        ? "none"
        : "", marginBottom: 20
    }}>
    <Navigation />
    <Search change={changeHandler}/>
    <Button type='primary' onClick={btnClick}>SEARCH</Button>
  </header>);
};

export default Header;
