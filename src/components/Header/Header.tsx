import React, {FunctionComponent} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {getSearchItems} from "../../store/actions";
import Navigation from "./Navigation/Navigation";
import {Descriptions, Input, message, PageHeader} from "antd";
import { Content } from "antd/lib/layout/layout";

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

  return (<header>
    <PageHeader avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}} className="site-page-header" title="Cool movies app">
    <Content>
    Search for movies, shows and games. Add them to your favorites list too.
    </Content>
    </PageHeader>
    <div style={{
        display: hide
          ? "none"
          : "",
        marginBottom: 20
      }}>
      <Navigation />
      <div style={{
          display: hideSearchBar
            ? "none"
            : ""
        }}>
        <Search placeholder="input search text" allowClear enterButton="Search" size="large" onSearch={onSearch}/>
      </div>
    </div>
  </header>);
};

export default Header;
