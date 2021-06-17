import React, {FunctionComponent} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {getSearchItems} from "../../store/actions";
import Navigation from "./Navigation/Navigation";
import {Input, message } from "antd";

const Header: FunctionComponent = () => {
  const location = useLocation();
  let hide = false;
  let hideSearchBar = false;
  const dispatch = useDispatch();
  const {Search} = Input;

  if (location.pathname === "/single") {
    hide = true;
  }

  if (location.pathname !== "/search") {
    hideSearchBar = true;
  }

  const onSearch = (value : string) => {
    if (value.trim().length < 3) {
      info();
      return;
    }
    dispatch(getSearchItems(value));
  };

  const info = () => {
    message.info("You must enter at least 3 letters!!!");
  };

  return (<header style={{
      display: hide
        ? "none"
        : "",
      marginBottom: 20
    }}>
    <Navigation/>
    <div style={{
        display: hideSearchBar
          ? "none"
          : ""
      }}>
      <Search placeholder="input search text" allowClear  enterButton="Search" size="large" onSearch={onSearch}/>
    </div>
  </header>);
};

export default Header;
